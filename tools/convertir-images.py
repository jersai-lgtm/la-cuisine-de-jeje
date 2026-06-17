# -*- coding: utf-8 -*-
"""
Convertit + range les photos de recettes en une seule commande.

UTILISATION (ultra simple) :
  1. Renomme ta photo avec la CLÉ de la recette, ex. "ChatGPT Image..." -> "pouleaupot.png"
     (la clé = ce qu'il y a dans ouvrirFiche('...') / le nom du .webp attendu)
  2. Dépose-la (ou plusieurs d'un coup) dans le dossier  _photos-a-convertir/  (créé au 1er lancement)
  3. Lance :  python tools/convertir-images.py

Le script : convertit chaque image en .webp optimisé, la place dans images/<lettre>/<clé>.webp,
déplace l'original dans _photos-a-convertir/_fait/, et te dit quelles recettes attendent encore une photo.
Formats acceptés : png, jpg, jpeg, webp, bmp.
"""
import os, re, glob, shutil, subprocess, sys
from PIL import Image

# Console Windows : forcer l'UTF-8 pour afficher les emojis sans planter
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "_photos-a-convertir")
DONE = os.path.join(DROP, "_fait")
EXT = (".png", ".jpg", ".jpeg", ".webp", ".bmp")
MAX = 1200      # côté max en pixels
QUALITE = 82

os.makedirs(DROP, exist_ok=True)
os.makedirs(DONE, exist_ok=True)

# Liste des clés de recettes attendant une image (via le contrôle d'intégrité)
def recettes_sans_image():
    try:
        out = subprocess.run(["node", os.path.join("tools", "verifier-donnees.mjs")],
                             cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
        return set(re.findall(r"- (\w+) : image introuvable", out.stdout))
    except Exception:
        return set()

def convertir(src, slug):
    sous = (slug[0] if slug else "_").lower()
    dossier = os.path.join(ROOT, "images", sous)
    os.makedirs(dossier, exist_ok=True)
    dest = os.path.join(dossier, slug + ".webp")
    im = Image.open(src).convert("RGB")
    if max(im.size) > MAX:
        im.thumbnail((MAX, MAX), Image.LANCZOS)
    im.save(dest, "WEBP", quality=QUALITE, method=6)
    return os.path.relpath(dest, ROOT)

fichiers = [f for f in glob.glob(os.path.join(DROP, "*")) if f.lower().endswith(EXT)]
if not fichiers:
    print("📂 Dépose tes photos (nommées avec la clé de recette, ex. pouleaupot.png)")
    print("   dans :", DROP)
    print("   puis relance.  python tools/convertir-images.py")
    raise SystemExit

attendues = recettes_sans_image()
ok, inconnus = [], []
for src in fichiers:
    slug = os.path.splitext(os.path.basename(src))[0].strip()
    if not re.fullmatch(r"[A-Za-z0-9]+", slug):
        inconnus.append((os.path.basename(src), "nom invalide (lettres/chiffres uniquement, = la clé)"))
        continue
    rel = convertir(src, slug)
    shutil.move(src, os.path.join(DONE, os.path.basename(src)))
    flag = "" if (not attendues or slug in attendues) else "  ⚠️ (aucune recette '%s' n'attend d'image — faute de frappe ?)" % slug
    ok.append("  ✅ %s%s" % (rel, flag))
    print("  ✅ %s -> %s%s" % (os.path.basename(src), rel, flag))

print("\n%d image(s) converties." % len(ok))
for nom, raison in inconnus:
    print("  ⏭️  ignoré : %s (%s)" % (nom, raison))

restantes = recettes_sans_image()
if restantes:
    print("\n📋 Recettes attendant encore une photo (%d) :" % len(restantes))
    print("   " + ", ".join(sorted(restantes)))
else:
    print("\n🎉 Toutes les recettes ont une photo !")
