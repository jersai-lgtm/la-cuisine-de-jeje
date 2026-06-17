# -*- coding: utf-8 -*-
# Élimine tous les "0,X" restants : cuillères -> g/ml, pincées -> g, pièces
# fractionnées de poids inconnu -> arrondi entier. Garde les comptes entiers et
# les g/ml/cl. Lignes de tableau uniquement. (Les pièces fractionnées de poids
# connu ont déjà été converties précédemment.)
import os, re, glob, unicodedata, sys
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
N = lambda s: unicodedata.normalize("NFC", s)

PIECE = {  # poids d'une pièce entière (g) — pour les fractions de poids connu
  "oeuf":50,"oeufs":50,"jauneoeuf":18,"blancoeuf":33,"oignon":100,"oignonrouge":110,"echalote":30,"ail":5,
  "citron":100,"citronvert":80,"orange":150,"pomme":150,"poire":160,"banane":120,"avocat":170,"figue":50,
  "tomate":100,"tomatecerise":10,"poivron":160,"carotte":70,"courgette":200,"concombre":300,"aubergine":250,
  "pommedeterre":150,"pdterre":150,"patatedouce":200,"navet":120,"poireau":100,"celeri":60,"champignon":20,
  "saucisse":50,"crevette":15,"piment":15,"jalapeno":15,"pimentoiseau":3,"datte":8,"pruneau":8,"radis":15,
}
LIQ = set("huile huileolive huiletournesol huilesesame lait laitconcentre laitcoco creme cremeliquide cremefraiche eau vinaigre vinaigrebalsamique saucesoja sirop vin vinblanc vinrouge rhum cognac jusorange jusananas juscitron bouillon nuocmam mirin".split())
PIECE_UNIT = re.compile(r"^(pi[eè]ce|pi[eè]ces|gousse|gousses|œuf|oeuf|oeufs|oignon|oignons|citron|citrons|tomate|tomates|jalapeno|piment)?$")

def g_ou_ml(slug, n):
    return str(max(1, round(n))) + (" ml" if slug in LIQ else " g")

def poids(slug, num):  # fraction de poids connu -> g, sinon arrondi entier (min 1)
    w = PIECE.get(slug) or (PIECE.get(slug[:-1]) if slug.endswith("s") else None)
    return (str(max(1, round(num * w))) + " g") if w else None

def conv(slug, val):
    s = N(val).strip(); low = s.lower()
    # Déjà une mesure réelle (poids/volume/longueur) -> garder tel quel
    if re.search(r"\d\s*(g|kg|mg|ml|cl|dl|l|litre|cm|mm)\b", low): return val
    # Cuillères, recherchées N'IMPORTE OÙ (gère aussi les valeurs corrompues
    # type "1.2 0,5 c.à.c" -> on prend la c.à juste avant l'unité)
    sp = re.search(r"([0-9]+(?:[.,][0-9]+)?)\s*c\.?\s?[àa]\.?\s?([cs])", low) \
         or re.search(r"([0-9]+(?:[.,][0-9]+)?)\s*cuill\w*\s*[àa]?\s*(s|c)", low)
    if sp:
        f = 15 if sp.group(2) == "s" else 5
        return g_ou_ml(slug, float(sp.group(1).replace(",", ".")) * f)
    # Pincées -> 1 g/pincée (évite "0,5 g")
    mp = re.search(r"([0-9]+(?:[.,][0-9]+)?)\s*pinc", low)
    if mp:
        return str(max(1, round(float(mp.group(1).replace(",", "."))))) + " g"
    # Nombre (+ fraction a/b) + reste
    mf = re.match(r"^([0-9]+)\s*/\s*([0-9]+)\s*(.*)$", s)
    if mf:
        num = int(mf.group(1)) / int(mf.group(2)); rest = N(mf.group(3).strip())
    else:
        m = re.match(r"^([0-9]+(?:[.,][0-9]+)?)\s*(.*)$", s)
        if not m: return val                                       # texte libre
        num = float(m.group(1).replace(",", ".")); rest = N(m.group(2).strip())
    if float(num).is_integer():                                    # compte entier -> garder (reformé)
        return (str(int(num)) + (" " + rest if rest else "")).strip()
    g = poids(slug, num)
    if g: return g                                                 # fraction + poids connu -> g
    return (str(max(1, round(num))) + (" " + rest if rest else "")).strip()  # sinon arrondi entier

ROW = re.compile(r"^\s*\{\s*nb\s*:\s*\d")
PAIR = re.compile(r'(\w+): "([^"]+)"')
n = [0]
def repl(mm):
    k, val = mm.group(1), mm.group(2)
    if k == "nb": return mm.group(0)
    nv = conv(k, val)
    if nv != val: n[0] += 1
    return '%s: "%s"' % (k, nv)
files = 0
for path in glob.glob(os.path.join(ROOT, "js", "recettes*.js")):
    if not re.search(r"recettes(_|\.)", os.path.basename(path)): continue
    lines = open(path, encoding="utf-8").read().split("\n")
    out = [PAIR.sub(repl, l) if ROW.match(l) else l for l in lines]
    new = "\n".join(out)
    if new != "\n".join(lines):
        open(path, "w", encoding="utf-8").write(new); files += 1
print("OK : %d quantites converties (cuilleres/pincees/pieces exotiques) sur %d fichiers." % (n[0], files))
