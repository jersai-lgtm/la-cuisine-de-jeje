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
    ("kotturoti", "Kottu Roti", "roti sri-lankais tranché sauté au wok avec légumes et curry"),
    ("hoppers", "Hoppers", "crêpe sri-lankaise en forme de bol au lait de coco avec un œuf"),
    ("polsambol", "Pol Sambol", "relish sri-lankais de noix de coco râpée et piment"),
    ("biryanidhaka", "Kacchi Biryani", "biryani bangladais de riz basmati et agneau mariné"),
    ("hilsacurry", "Hilsa au Curry", "curry bangladais de poisson hilsa à la moutarde"),
    ("momosnepal", "Momo Népalais", "raviolis vapeur népalais plissés farcis de viande épicée"),
    ("dalbhat", "Dal Bhat", "plateau népalais de lentilles, riz, légumes et pickle"),
    ("amoknombodge", "Amok", "poisson cambodgien vapeur au curry kroeung et lait de coco en feuille de bananier"),
    ("lokialcambodge", "Lok Lak", "sauté cambodgien de bœuf caramélisé sur salade avec jaune d'œuf cru"),
    ("orlam", "Or Lam", "ragoût laotien épais de viande et aubergines"),
    ("buuz", "Buuz", "raviolis vapeur mongols en dôme farcis d'agneau"),
    ("khorkhog", "Khorkhog", "ragoût mongol d'agneau et légumes à la cocotte"),
    ("khorovatsarmenien", "Khorovats", "brochettes arméniennes de porc grillées aux braises avec légumes fumés"),
    ("dolmaarmenien", "Dolma Arménien", "poivrons et tomates arméniens farcis de viande hachée et riz"),
    ("ugali", "Ugali", "polenta kényane ferme de farine de maïs"),
    ("nyamachoma", "Nyama Choma", "viande kényane grillée avec salade kachumbari"),
    ("pilautanzanie", "Pilau Tanzanien", "riz tanzanien parfumé aux épices avec viande"),
    ("sambusatanzanie", "Sambusa Tanzanienne", "triangles tanzaniens frits farcis de viande épicée"),
    ("romazava", "Romazava", "ragoût malgache de bœuf et feuilles vertes avec riz"),
    ("ravitoto", "Ravitoto", "feuilles de manioc pilées malgaches avec porc et lait de coco"),
    ("saltenabolivie", "Salteña", "chausson bolivien fourré d'un ragoût de viande et pomme de terre"),
    ("chairo", "Chairo", "soupe bolivienne épaisse d'altitude à l'agneau et légumes"),
    ("sopaparaguayenne", "Sopa Paraguaya", "gâteau salé paraguayen à la farine de maïs et fromage"),
    ("chipaguarani", "Chipa Guarani", "petits pains paraguayens moelleux au manioc et fromage"),
    ("concondominicain", "El Concón", "croûte de riz caramélisée dominicaine au fond de la marmite"),
    ("mangubandominicain", "Mangú Dominicain", "purée dominicaine de plantains verts avec oignons vinaigrés"),
    ("johnnycake", "Johnny Cake", "petit pain bahaméen dense légèrement sucré"),
    ("conchsalad", "Conch Salad", "salade fraîche bahaméenne de conque marinée au citron vert"),
    ("agneauislandais", "Ragoût d'Agneau Islandais", "ragoût islandais d'agneau et légumes racines d'hiver"),
    ("kjotsupa", "Kjötsúpa", "soupe islandaise claire d'agneau et légumes racines"),
    ("karjalanpiirakka", "Karjalanpiirakka", "petites tourtes finlandaises de seigle garnies de porridge de riz"),
    ("kalakukko", "Kalakukko", "pain finlandais de seigle massif farci de poisson et lard"),
    ("farikal", "Fårikål", "agneau et chou norvégiens mijotés en couches"),
    ("raspeball", "Raspeball", "boulettes norvégiennes de pomme de terre râpée avec lard et saucisse"),
    ("peleklizirni", "Pelēkie Zirņi", "pois gris lettons mijotés avec lardons fumés"),
    ("sklandrausis", "Sklandrausis", "petites tartelettes lettonnes de seigle à la purée de pomme de terre et carotte"),
    ("kacamak", "Kačamak", "bouillie monténégrine de farine de maïs et pomme de terre au fromage"),
    ("ripljacorba", "Riblja Čorba", "soupe de poisson monténégrine à la tomate et au paprika"),
    ("tavekosi", "Tavë Kosi", "agneau et riz albanais gratinés sous une sauce yaourt-œuf"),
    ("byrekalbanie", "Byrek", "tourte albanaise en spirale de pâte fine farcie d'épinards et fromage"),
    ("banitsa", "Banitsa", "feuilleté bulgare froissé garni de fromage blanc et œuf"),
    ("shopska", "Salade Shopska", "salade bulgare de tomate, concombre et poivron recouverte de fromage blanc"),
    ("welshrarebit", "Welsh Rarebit", "toast gallois nappé d'une sauce fondante au cheddar et à la bière"),
    ("cawl", "Cawl", "soupe-ragoût galloise d'agneau, poireau et légumes racines"),
    ("haggisscotland", "Haggis", "panse de brebis écossaise farcie d'abats et flocons d'avoine, avec purée"),
    ("cranachan", "Cranachan", "dessert écossais en verrine de crème fouettée au whisky, avoine et framboises"),
    ("kapunata", "Kapunata", "ratatouille maltaise d'aubergine, poivron, tomate et câpres"),
    ("timpanamalte", "Timpana", "gâteau maltais de pâtes en croûte de pâte feuilletée"),
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
