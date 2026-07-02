# -*- coding: utf-8 -*-
"""
Genere automatiquement les photos de recettes manquantes via l'API OpenAI
(gpt-image-1), une image par plat, en pleine resolution (1024x1024).

Lit la cle API depuis le fichier .env (JAMAIS committe, voir .gitignore) :
  OPENAI_API_KEY=sk-...

Usage :
  python tools/_generer_images_ia.py          -> genere tout ce qui manque
  python tools/_generer_images_ia.py --test    -> genere seulement 1 image (test)
"""
import os
import sys
import time
import base64
import urllib.request
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "_photos-a-convertir")
ENV_FILE = os.path.join(ROOT, ".env")
MODEL = "gpt-image-1"
TAILLE = "1024x1024"

# cle: (nom affiche, description courte pour le prompt)
PLATS = [
    ("chelokebab", "Chelo Kebab (riz safrané iranien et brochettes d'agneau)"),
    ("tahchin", "Tahchin (gâteau de riz iranien au safran et poulet)"),
    ("bastilla", "Bastilla marocaine (tourte feuilletée au poulet et amandes)"),
    ("chapati", "Chapati indien (galette de blé complet)"),
    ("uttapam", "Uttapam indien (crêpe épaisse garnie d'oignon et tomate)"),
    ("appam", "Appam indien (crêpe au lait de coco aux bords dentelés)"),
    ("laphet", "Laphet Thoke birman (salade de feuilles de thé fermentées)"),
    ("mohinga", "Mohinga birman (soupe de nouilles de riz au poisson)"),
    ("nemnuong", "Nem Nuong vietnamien (brochettes de porc à la citronnelle grillées)"),
    ("chagio", "Cha Gio vietnamien (rouleaux de printemps frits croustillants)"),
    ("ondehondeh", "Ondeh Ondeh malaisien (boules de riz gluant vertes au sucre de palme, roulées coco)"),
    ("kuehlapis", "Kueh Lapis indonésien (gâteau à mille couches épicé)"),
    ("martabaktelur", "Martabak Telur indonésien (crêpe farcie viande et œuf, pliée et frite)"),
    ("sundaecoreen", "Sundae coréen (saucisse de riz gluant et vermicelles, plat salé, pas une glace)"),
    ("injeolmi", "Injeolmi coréen (petits carrés de riz gluant roulés dans la poudre de soja)"),
    ("seekhkebab", "Seekh Kebab indien (brochettes de viande hachée épicée grillées)"),
    ("biryanihyderabadi", "Biryani Hyderabadi (riz basmati safrané à l'agneau mariné)"),
    ("saagpaneer", "Saag Paneer indien (purée d'épinards crémeuse et cubes de fromage paneer)"),
    ("misalpav", "Misal Pav indien (curry pimenté de haricots germés avec pain)"),
    ("khamandhokla", "Khaman Dhokla indien (petits carrés moelleux de pois chiche cuits vapeur)"),
    ("botikebab", "Boti Kebab indien (brochettes de cubes d'agneau marinés grillés)"),
    ("cachorroquente", "Cachorro Quente brésilien (hot-dog garni maïs, petits pois et purée)"),
    ("pastelbrasil", "Pastel Brasileiro (chausson brésilien frit ultra-croustillant)"),
    ("escondidinho", "Escondidinho brésilien (gratin de viande effilochée sous purée de manioc)"),
    ("baiao", "Baião de Dois brésilien (riz et haricots au fromage coalho)"),
    ("chivitouruguay", "Chivito Uruguayo (sandwich géant bœuf, jambon, fromage, œuf)"),
    ("tacutacu", "Tacu Tacu péruvien (galette de riz et haricots pressés avec œuf)"),
    ("chaufaperou", "Arroz Chaufa péruvien (riz sauté façon chinoise au poulet)"),
    ("fritaycubaine", "Frita Cubana (burger épicé cubain aux pailles de pomme de terre)"),
    ("fufunigeria", "Fufu nigérian (boules de pâte de manioc lisse)"),
    ("adanakebab", "Adana Kebab turc (brochette large d'agneau haché épicé grillée)"),
    ("revithiasoupe", "Revithia grecque (soupe de pois chiches à l'huile d'olive)"),
    ("fasolada", "Fasolada grecque (soupe de haricots blancs)"),
    ("horiatiki", "Salade Horiatiki grecque (tomate, concombre, feta, olives)"),
    ("fritturamista", "Frittura Mista italienne (friture de petits poissons, calamars et crevettes)"),
    ("suppliromain", "Supplì al Telefono italien (croquette de riz frite au cœur de mozzarella filante)"),
    ("ribollita", "Ribollita toscane (soupe épaisse haricots, chou et pain)"),
    ("porotosgranados", "Porotos Granados chiliens (ragoût de haricots frais, maïs et courge)"),
    ("cazuela", "Cazuela chilienne (pot-au-feu clair au poulet, pomme de terre et maïs)"),
    ("completoitaliano", "Completo Italiano chilien (hot-dog à l'avocat écrasé, tomate, mayonnaise)"),
    ("arepacolombie", "Arepa colombienne (galette de maïs fourrée au fromage fondant)"),
    ("freekeh", "Freekeh libanais (blé vert torréfié mijoté au poulet)"),
    ("krembo", "Krembo israélien (biscuit surmonté de mousse enrobée de chocolat)"),
    ("mulukhiyah", "Molokheya égyptienne (soupe verte onctueuse aux feuilles de corète, servie sur riz)"),
    ("kremowka", "Kremówka polonaise (mille-feuille à l'épaisse crème pâtissière)"),
    ("yassapoisson", "Yassa au Poisson sénégalais (poisson mariné aux oignons et citron, sur riz)"),
    ("knedliky", "Knedlíky tchèques (boulettes de pain tranchées en rondelles)"),
    ("svickova", "Svíčková tchèque (bœuf braisé nappé de sauce crémeuse aux légumes racines)"),
    ("borschtukrainien", "Bortsch ukrainien (soupe pourpre à la betterave et au bœuf, crème aigre)"),
    ("chakapuligeorgie", "Chakapuli géorgien (ragoût d'agneau au vin blanc et à l'estragon)"),
]

def charger_cle():
    if not os.path.exists(ENV_FILE):
        print("ERREUR : fichier .env introuvable a la racine du projet.")
        print("Cree un fichier .env contenant : OPENAI_API_KEY=sk-...")
        sys.exit(1)
    with open(ENV_FILE, "r", encoding="utf-8") as f:
        for ligne in f:
            ligne = ligne.strip()
            if ligne.startswith("OPENAI_API_KEY="):
                return ligne.split("=", 1)[1].strip()
    print("ERREUR : OPENAI_API_KEY absente du fichier .env")
    sys.exit(1)

def generer_image(cle_api, prompt):
    url = "https://api.openai.com/v1/images/generations"
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": TAILLE,
        "quality": "high",
        "n": 1,
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Authorization", "Bearer " + cle_api)
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    b64 = data["data"][0]["b64_json"]
    return base64.b64decode(b64)

def main():
    cle_api = charger_cle()
    os.makedirs(DROP, exist_ok=True)
    test_seulement = "--test" in sys.argv

    a_faire = []
    for cle, desc in PLATS:
        dest_png = os.path.join(DROP, cle + ".png")
        # cherche aussi si l'image finale existe deja dans images/
        lettre = cle[0]
        dest_webp = os.path.join(ROOT, "images", lettre, cle + ".webp")
        if os.path.exists(dest_png) or os.path.exists(dest_webp):
            continue
        a_faire.append((cle, desc))

    if test_seulement:
        a_faire = a_faire[:1]

    print(f"{len(a_faire)} image(s) a generer.\n")
    for i, (cle, desc) in enumerate(a_faire, 1):
        prompt = (
            f"Photo réaliste et appétissante de {desc}, "
            "cadrage carré, sans texte, sans logo, un seul plat dans l'image, fond neutre."
        )
        print(f"[{i}/{len(a_faire)}] {cle} ...", end=" ", flush=True)
        try:
            img_bytes = generer_image(cle_api, prompt)
            dest = os.path.join(DROP, cle + ".png")
            with open(dest, "wb") as f:
                f.write(img_bytes)
            print(f"OK ({len(img_bytes)} octets)")
        except Exception as e:
            print(f"ECHEC : {e}")
        time.sleep(1)  # eviter de marteler l'API

    print("\nTermine. Lance ensuite : python tools/convertir-images.py")

if __name__ == "__main__":
    main()
