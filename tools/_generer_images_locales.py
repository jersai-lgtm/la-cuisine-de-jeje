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
ustensile de service...), pancarte en carton kraft POSEE (pas plantee dans
la nourriture) avec le nom du plat. Voir memoire generation-locale-flux-comfyui
et style-photos-ia-recettes pour le contexte complet.

Usage :
  python tools/_generer_images_locales.py          -> genere tout ce qui manque
  python tools/_generer_images_locales.py --test    -> genere seulement 1 image
"""
import os
import sys
import json
import time
import shutil
import urllib.request
import urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "_photos-a-convertir")
API = "http://127.0.0.1:8188"
COMFY_OUTPUT = r"C:\AI\ComfyUI\ComfyUI_windows_portable\ComfyUI\output"

# cle: (nom affiche, description visuelle du plat, accessoires/props contextuels)
# Toujours adapter les props au plat specifique (pas de props generiques repetes) :
# ex. riz+cacahuetes pour un plat africain, tahini+pita pour du moyen-oriental,
# the+baguettes pour un plat asiatique.
PLATS = [
    # ("cle", "Nom Affiche", "description visuelle realiste du plat",
    #  "2-4 accessoires/ingredients poses autour, pertinents au plat"),
]


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


def build_workflow(nom, desc, props, seed, filename_prefix):
    prompt = (
        f"Photo culinaire ultra realiste et professionnelle de {desc}, au centre de l'image. "
        "Eclairage chaud et dramatique sur fond de table en bois sombre et rustique, net du premier plan "
        "a l'arriere-plan, sans flou ni bokeh. Autour du plat, disposes avec soin : "
        f"{props}, pour creer une scene de table vivante et riche, pas une photo isolee sur une planche vide. "
        f"Une petite pancarte en carton kraft posee debout pres du plat indique son nom, \"{nom}\", "
        "ecrit en lettres nettes et parfaitement lisibles. Cadrage carre, ambiance chaleureuse de blog culinaire haut de gamme."
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


def main():
    check_server()
    os.makedirs(DROP, exist_ok=True)
    test_seulement = "--test" in sys.argv

    a_faire = []
    for cle, nom, desc, props in PLATS:
        dest_png = os.path.join(DROP, cle + ".png")
        lettre = cle[0]
        dest_webp = os.path.join(ROOT, "images", lettre, cle + ".webp")
        if os.path.exists(dest_png) or os.path.exists(dest_webp):
            continue
        a_faire.append((cle, nom, desc, props))

    if test_seulement:
        a_faire = a_faire[:1]

    print(f"{len(a_faire)} image(s) a generer.\n")
    for i, (cle, nom, desc, props) in enumerate(a_faire, 1):
        print(f"[{i}/{len(a_faire)}] {cle} ...", end=" ", flush=True)
        try:
            wf = build_workflow(nom, desc, props, seed=1000 + i, filename_prefix="gen_" + cle)
            prompt_id = submit(wf)
            dest = os.path.join(DROP, cle + ".png")
            ok = wait_and_fetch(prompt_id, dest)
            print("OK" if ok else "TIMEOUT")
        except Exception as e:
            print(f"ECHEC : {e}")

    print("\nTermine. Lance ensuite : python tools/convertir-images.py")


if __name__ == "__main__":
    main()
