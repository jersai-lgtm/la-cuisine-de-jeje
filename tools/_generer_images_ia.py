# -*- coding: utf-8 -*-
"""
Genere automatiquement les photos de recettes manquantes via l'API OpenAI
(gpt-image-1), une image par plat, en pleine resolution (1024x1024).

Style (valide par Jerome le 2026-07-02) : fond rustique NET (bois/ardoise/
table), sans flou/bokeh d'arriere-plan, avec une petite pancarte/ardoise
indiquant le nom du plat. Format carre (l'API ne propose que 1024x1024,
1024x1536, 1536x1024 -- pas de 16:9 exact malgre ce que ChatGPT web laisse
croire dans ses propres prompts).

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

# cle: (nom court pour la pancarte, description courte pour le prompt)
PLATS = [
    ("chelokebab", "Chelo Kebab", "riz safrané iranien et brochettes d'agneau"),
    ("tahchin", "Tahchin", "gâteau de riz iranien au safran et poulet"),
    ("bastilla", "Bastilla", "tourte marocaine feuilletée au poulet et amandes"),
    ("chapati", "Chapati", "galette de blé complet indienne"),
    ("uttapam", "Uttapam", "crêpe indienne épaisse garnie d'oignon et tomate"),
    ("appam", "Appam", "crêpe indienne au lait de coco aux bords dentelés"),
    ("laphet", "Laphet Thoke", "salade birmane de feuilles de thé fermentées"),
    ("mohinga", "Mohinga", "soupe birmane de nouilles de riz au poisson"),
    ("nemnuong", "Nem Nuong", "brochettes vietnamiennes de porc à la citronnelle grillées"),
    ("chagio", "Cha Gio", "rouleaux de printemps vietnamiens frits croustillants"),
    ("ondehondeh", "Ondeh Ondeh", "boules de riz gluant vertes malaisiennes au sucre de palme, roulées coco"),
    ("kuehlapis", "Kueh Lapis", "gâteau indonésien à mille couches épicé"),
    ("martabaktelur", "Martabak Telur", "crêpe indonésienne farcie viande et œuf, pliée et frite"),
    ("sundaecoreen", "Sundae", "saucisse coréenne de riz gluant et vermicelles, plat salé, pas une glace"),
    ("injeolmi", "Injeolmi", "petits carrés coréens de riz gluant roulés dans la poudre de soja"),
    ("seekhkebab", "Seekh Kebab", "brochettes indiennes de viande hachée épicée grillées"),
    ("biryanihyderabadi", "Biryani Hyderabadi", "riz basmati safrané indien à l'agneau mariné"),
    ("saagpaneer", "Saag Paneer", "purée indienne d'épinards crémeuse et cubes de fromage paneer"),
    ("misalpav", "Misal Pav", "curry indien pimenté de haricots germés avec pain"),
    ("khamandhokla", "Khaman Dhokla", "petits carrés indiens moelleux de pois chiche cuits vapeur"),
    ("botikebab", "Boti Kebab", "brochettes indiennes de cubes d'agneau marinés grillés"),
    ("cachorroquente", "Cachorro Quente", "hot-dog brésilien garni maïs, petits pois et purée"),
    ("pastelbrasil", "Pastel Brasileiro", "chausson brésilien frit ultra-croustillant"),
    ("escondidinho", "Escondidinho", "gratin brésilien de viande effilochée sous purée de manioc"),
    ("baiao", "Baião de Dois", "riz et haricots brésiliens au fromage coalho"),
    ("chivitouruguay", "Chivito", "sandwich géant uruguayen bœuf, jambon, fromage, œuf"),
    ("tacutacu", "Tacu Tacu", "galette péruvienne de riz et haricots pressés avec œuf"),
    ("chaufaperou", "Arroz Chaufa", "riz sauté péruvien façon chinoise au poulet"),
    ("fritaycubaine", "Frita Cubana", "burger épicé cubain aux pailles de pomme de terre"),
    ("fufunigeria", "Fufu", "boules nigérianes de pâte de manioc lisse"),
    ("adanakebab", "Adana Kebab", "brochette turque large d'agneau haché épicé grillée"),
    ("revithiasoupe", "Revithia", "soupe grecque de pois chiches à l'huile d'olive"),
    ("fasolada", "Fasolada", "soupe grecque de haricots blancs"),
    ("horiatiki", "Salade Horiatiki", "salade grecque tomate, concombre, feta, olives"),
    ("fritturamista", "Frittura Mista", "friture italienne de petits poissons, calamars et crevettes"),
    ("suppliromain", "Supplì al Telefono", "croquette de riz italienne frite au cœur de mozzarella filante"),
    ("ribollita", "Ribollita", "soupe toscane épaisse haricots, chou et pain"),
    ("porotosgranados", "Porotos Granados", "ragoût chilien de haricots frais, maïs et courge"),
    ("cazuela", "Cazuela", "pot-au-feu chilien clair au poulet, pomme de terre et maïs"),
    ("completoitaliano", "Completo Italiano", "hot-dog chilien à l'avocat écrasé, tomate, mayonnaise"),
    ("arepacolombie", "Arepa", "galette colombienne de maïs fourrée au fromage fondant"),
    ("freekeh", "Freekeh", "blé vert libanais torréfié mijoté au poulet"),
    ("krembo", "Krembo", "biscuit israélien surmonté de mousse enrobée de chocolat"),
    ("mulukhiyah", "Molokheya", "soupe égyptienne verte onctueuse aux feuilles de corète, servie sur riz"),
    ("kremowka", "Kremówka", "mille-feuille polonais à l'épaisse crème pâtissière"),
    ("yassapoisson", "Yassa au Poisson", "poisson sénégalais mariné aux oignons et citron, sur riz"),
    ("knedliky", "Knedlíky", "boulettes de pain tchèques tranchées en rondelles"),
    ("svickova", "Svíčková", "bœuf braisé tchèque nappé de sauce crémeuse aux légumes racines"),
    ("borschtukrainien", "Bortsch", "soupe ukrainienne pourpre à la betterave et au bœuf, crème aigre"),
    ("chakapuligeorgie", "Chakapuli", "ragoût géorgien d'agneau au vin blanc et à l'estragon"),
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
    for cle, nom, desc in PLATS:
        dest_png = os.path.join(DROP, cle + ".png")
        # cherche aussi si l'image finale existe deja dans images/
        lettre = cle[0]
        dest_webp = os.path.join(ROOT, "images", lettre, cle + ".webp")
        if os.path.exists(dest_png) or os.path.exists(dest_webp):
            continue
        a_faire.append((cle, nom, desc))

    if test_seulement:
        a_faire = a_faire[:1]

    print(f"{len(a_faire)} image(s) a generer.\n")
    for i, (cle, nom, desc) in enumerate(a_faire, 1):
        prompt = (
            f"Photo ultra réaliste et professionnelle de {desc}. "
            "Présentation gastronomique, fond rustique (bois, ardoise ou table selon le plat), "
            "net du premier plan à l'arrière-plan (pas d'effet de flou/bokeh), lumière naturelle et appétissante. "
            f"Une petite pancarte en bois ou ardoise posée à côté du plat indique son nom, \"{nom}\", "
            "écrit à la craie ou en lettres élégantes. Cadrage carré, un seul plat visible dans l'image."
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
