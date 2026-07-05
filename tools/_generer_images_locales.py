# -*- coding: utf-8 -*-
"""
Genere les photos de recettes manquantes via ComfyUI local (Flux schnell,
GGUF quantifie), gratuit et sans API payante. Alternative a
tools/_generer_images_ia.py pour les grosses vagues (5000+ recettes) ou le
cout de l'API OpenAI deviendrait prohibitif.

Prealable : ComfyUI doit tourner en local sur http://127.0.0.1:8188
  cd C:\\AI\\ComfyUI\\ComfyUI_windows_portable
  .\\python_embeded\\python.exe -s ComfyUI\\main.py --windows-standalone-build

Style "scene enrichie" valide par Jerome le 2026-07-02 : le plat au centre,
entoure de 2-4 accessoires/ingredients pertinents au plat (bols de garniture,
ustensile de service...). PAS de pancarte/texte sur la photo (le nom du plat
est deja affiche par l'appli, une pancarte est redondante -- retiree le
2026-07-03). Voir memoire generation-locale-flux-comfyui et
style-photos-ia-recettes pour le contexte complet.

Usage :
  node tools/_selectionner_lot_scene.mjs [taille]   -> prepare un lot (defaut 100) dans tools/_lot_scene.json
  python tools/_generer_images_locales.py           -> genere tout le lot + convertit en webp
  python tools/_generer_images_locales.py --test    -> genere seulement 1 image (pas de conversion)

Reprenable : tools/_photos_scene_faites.json garde la trace des recettes deja
refaites (le selecteur l'utilise pour ne pas reproposer les memes cles).
"""
import os
import sys
import json
import time
import shutil
import subprocess
import urllib.request
import urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "_photos-a-convertir")
API = "http://127.0.0.1:8188"
COMFY_OUTPUT = r"C:\AI\ComfyUI\ComfyUI_windows_portable\ComfyUI\output"
LOT_JSON = os.path.join(ROOT, "tools", "_lot_scene.json")
MANIFEST = os.path.join(ROOT, "tools", "_photos_scene_faites.json")


def check_server():
    try:
        with urllib.request.urlopen(API + "/system_stats", timeout=5) as resp:
            json.loads(resp.read().decode("utf-8"))
    except Exception:
        print("ERREUR : ComfyUI ne repond pas sur " + API)
        print("Lance-le d'abord :")
        print(r"  cd C:\AI\ComfyUI\ComfyUI_windows_portable")
        print(r"  .\python_embeded\python.exe -s ComfyUI\main.py --windows-standalone-build")
        sys.exit(1)


CATEGORIES_CONTENANT = {"sauces", "tartinables"}

def build_workflow(desc, props, seed, filename_prefix, cat=None):
    if cat in CATEGORIES_CONTENANT:
        sujet = (
            f"Photo culinaire ultra realiste et professionnelle de {desc}, servie dans un petit bol en "
            "ceramique ou un pot en verre (jamais etalee sur une grande assiette plate, jamais de "
            "fourchette plantee dedans), au centre de l'image."
        )
    else:
        sujet = f"Photo culinaire ultra realiste et professionnelle de {desc}, au centre de l'image."
    prompt = (
        f"{sujet} "
        "Eclairage chaud et dramatique sur fond de table en bois sombre et rustique, net du premier plan "
        "a l'arriere-plan, sans flou ni bokeh. Scene de nature morte culinaire, sans aucune presence humaine "
        "(aucune main, aucun bras, aucun visage, aucune personne dans le cadre). Autour du plat, disposes avec soin : "
        f"{props}, pour creer une scene de table riche, pas une photo isolee sur une planche vide. "
        "Cadrage carre, ambiance chaleureuse de blog culinaire haut de gamme."
    )
    return {
        "1": {"class_type": "UnetLoaderGGUF", "inputs": {"unet_name": "flux1-schnell-Q5_K_S.gguf"}},
        "2": {"class_type": "DualCLIPLoaderGGUF", "inputs": {
            "clip_name1": "t5-v1_1-xxl-encoder-Q5_K_M.gguf",
            "clip_name2": "clip_l.safetensors", "type": "flux"}},
        "3": {"class_type": "VAELoader", "inputs": {"vae_name": "ae.safetensors"}},
        "4": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["2", 0]}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {"text": "", "clip": ["2", 0]}},
        "7": {"class_type": "EmptySD3LatentImage", "inputs": {"width": 1024, "height": 1024, "batch_size": 1}},
        "8": {"class_type": "KSampler", "inputs": {
            "model": ["1", 0], "positive": ["4", 0], "negative": ["5", 0], "latent_image": ["7", 0],
            "seed": seed, "steps": 4, "cfg": 1.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0}},
        "9": {"class_type": "VAEDecode", "inputs": {"samples": ["8", 0], "vae": ["3", 0]}},
        "10": {"class_type": "SaveImage", "inputs": {"images": ["9", 0], "filename_prefix": filename_prefix}},
    }


def submit(workflow):
    payload = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(API + "/prompt", data=payload, method="POST")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))["prompt_id"]


def wait_and_fetch(prompt_id, dest_path, timeout_s=300):
    start = time.time()
    while time.time() - start < timeout_s:
        with urllib.request.urlopen(API + "/history/" + prompt_id, timeout=10) as resp:
            hist = json.loads(resp.read().decode("utf-8"))
        entry = hist.get(prompt_id)
        if entry and entry.get("status", {}).get("completed"):
            images = entry["outputs"]["10"]["images"]
            filename = images[0]["filename"]
            src = os.path.join(COMFY_OUTPUT, filename)
            shutil.copy(src, dest_path)
            return True
        time.sleep(3)
    return False


def charger_manifest():
    if os.path.exists(MANIFEST):
        with open(MANIFEST, "r", encoding="utf-8") as f:
            return set(json.load(f))
    return set()


def marquer_fait(cle, faites):
    faites.add(cle)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(sorted(faites), f, ensure_ascii=False, indent=1)


def main():
    check_server()
    os.makedirs(DROP, exist_ok=True)
    test_seulement = "--test" in sys.argv

    if not os.path.exists(LOT_JSON):
        print("ERREUR : " + LOT_JSON + " introuvable.")
        print("Genere d'abord un lot : node tools/_selectionner_lot_scene.mjs [taille]")
        sys.exit(1)
    with open(LOT_JSON, "r", encoding="utf-8") as f:
        lot = json.load(f)

    faites = charger_manifest()
    a_faire = []
    for item in lot:
        cle = item["cle"]
        if cle in faites:
            continue
        dest_png = os.path.join(DROP, cle + ".png")
        if os.path.exists(dest_png):
            continue
        a_faire.append(item)

    if test_seulement:
        a_faire = a_faire[:1]

    print(f"{len(a_faire)} image(s) a generer.\n")
    reussies = 0
    for i, item in enumerate(a_faire, 1):
        cle, desc, props = item["cle"], item["desc"], item["props"]
        cat = item.get("cat")
        print(f"[{i}/{len(a_faire)}] {cle} ...", end=" ", flush=True)
        try:
            wf = build_workflow(desc, props, seed=1000 + i, filename_prefix="gen_" + cle, cat=cat)
            prompt_id = submit(wf)
            dest = os.path.join(DROP, cle + ".png")
            ok = wait_and_fetch(prompt_id, dest)
            print("OK" if ok else "TIMEOUT")
            if ok:
                marquer_fait(cle, faites)
                reussies += 1
        except Exception as e:
            print(f"ECHEC : {e}")

    print(f"\n{reussies}/{len(a_faire)} reussies.")
    if reussies and not test_seulement:
        print("Conversion en webp...")
        subprocess.run([sys.executable, os.path.join(ROOT, "tools", "convertir-images.py")], cwd=ROOT)


if __name__ == "__main__":
    main()
