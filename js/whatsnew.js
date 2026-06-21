// ============================================================
// whatsnew.js — "Quoi de neuf ?" (note d'informations) v1.2.0
// Bouton ⓘ dans l'en-tête. Pastille rouge tant que la dernière note
// n'a pas été lue (mémorisé en local, marche même sans compte).
//
// 👉 Pour annoncer une nouveauté : ajoute une entrée EN HAUT de QUOI_DE_NEUF
//    (avec un numéro de version plus récent). Pour un petit patch (ajout de
//    recettes…), n'ajoute rien : pas d'entrée = pas de pastille.
// ============================================================

const QUOI_DE_NEUF = [
  {
    v: "2.2.6",
    titre: "🍷 Accords boissons + 🎯 objectif nutri",
    texte: "Deux nouveautés dans chaque recette ! 🍷 Une suggestion d'accord boisson (vin, bière… toujours avec une option sans alcool). Et 🎯 tu peux fixer un objectif nutritionnel (calories/jour + un focus comme léger ou protéiné) : la fiche te montre alors quelle part de ta journée représente la recette, et si elle colle à ton objectif. Bon appétit ! 👨‍🍳"
  },
  {
    v: "2.2.5",
    titre: "🌗 Thème clair",
    texte: "Tu préfères le clair ? Un nouveau bouton 🌙 / ☀️ en haut de l'appli bascule entre le mode sombre (par défaut) et un tout nouveau mode clair, tout doux pour les yeux en journée. Ton choix est mémorisé. 🎨"
  },
  {
    v: "2.2.4",
    titre: "🍽️ « Qu'est-ce qu'on mange ? »",
    texte: "Plus d'inspiration en panne ! En haut de l'accueil, un nouveau bouton ouvre un mode découverte façon swipe : fais défiler des recettes (👈 passer, 👉 voir), et quand une te fait envie, hop, la fiche s'ouvre. Ça suit ton profil (allergènes, régime) et la saison. Parfait pour décider du dîner en 30 secondes. 😋"
  },
  {
    v: "2.1.10",
    titre: "🔔 Reçois la recette du jour",
    texte: "Tu peux maintenant activer les notifications : chaque jour à 11h30, une idée de recette du jour t'attend directement sur ton téléphone (un clic et la recette s'ouvre) ! Et le samedi, un petit rappel si tu as une liste de courses en cours. Pour activer : accepte la petite invitation 🔔 qui apparaît, ou recharge l'appli. Tu peux refuser, c'est sans engagement. 👨‍🍳"
  },
  {
    v: "2.1.7",
    titre: "📸 Partage une recette en image",
    texte: "Nouveau bouton 📸 Image dans chaque recette : il crée une jolie carte (photo, titre, temps, niveau) prête à poster en story ou en feed Instagram, ou à envoyer à tes amis. Un clic et c'est partagé (ou enregistré). Fais voir tes plats ! 🤳"
  },
  {
    v: "2.1.6",
    titre: "⚖️ Mesures américaines (oz, cups, °F)",
    texte: "Dans chaque recette, un bouton ⚖️ convertit les quantités en mesures impériales : grammes → oz/lb, ml → fl oz/cups, et les températures °C → °F. Pratique pour cuisiner avec des mesures américaines (ou pour nos amis anglophones). Un clic pour basculer, un clic pour revenir. 👨‍🍳"
  },
  {
    v: "2.1.4",
    titre: "🗓️ Recette du jour + nouveaux filtres",
    texte: "Deux nouveautés ! 🗓️ En haut de l'accueil, une « recette du jour » mise en avant — elle change chaque jour, de quoi trouver l'inspiration sans réfléchir. Et dans les Recettes, 3 nouveaux filtres rapides : 🌾 Sans gluten, 🪶 Léger (moins de 500 kcal/portion) et 💪 Protéiné (au moins 20 g de protéines/portion). Un clic et tu ne vois que ce qui te convient. Bon appétit ! 👨‍🍳"
  },
  {
    v: "2.0.6",
    titre: "🎉 Filtre par occasion",
    texte: "Dans les Recettes, une nouvelle ligne de filtres « occasions » : 🥂 Apéro, 🔥 Barbecue, 🧺 Pique-nique, 🎄 Fêtes. Un clic et tu ne vois que les recettes qui collent au moment — pratique pour préparer ton barbecue du week-end ou ton repas de fête. Bonus : l'app démarre plus vite (les traductions anglaises ne se chargent que si tu passes en anglais). 👨‍🍳"
  },
  {
    v: "1.11.55",
    titre: "🤖 L'assistant vocal répond à tes questions",
    texte: "Le micro 🎙️ de la barre de recherche est un vrai assistant : appuie et parle (français ou anglais). Ouvre une recette, demande une idée (« une recette italienne rapide sans miel », « un dessert pas cher »), navigue, ajoute à ta liste ou génère un menu — à la voix. En cuisson, pilote tout sans toucher l'écran (« suivant », « va à l'étape 3 », « minuteur dix minutes », « temps restant ») et active l'écoute mains-libres 👂. Nouveau : pose-lui tes questions de cuisine — « c'est quoi un bain-marie ? », « par quoi remplacer le mascarpone ? », « qu'est-ce que je fais avec du poulet et des courgettes ? » — il te répond. 🤖 (réponses IA quand tu es connecté·e)"
  },
  {
    v: "1.11.21",
    titre: "🆕 Vocal, minuteurs, budget, garde-manger…",
    texte: "Grosse mise à jour ! 🔊 En mode cuisson, les étapes se lisent à voix haute (mains libres) et tu peux lancer plusieurs minuteurs en parallèle. 💰 Ta liste de courses affiche son budget estimé. 📤 Partage ton menu de la semaine comme ta liste. 🥕 Le vide-frigo ignore les basiques (sel, huile…) et ajoute les ingrédients manquants à ta liste en un clic. 📦 Et un nouveau garde-manger te prévient avant que tes aliments ne périment ! 👨‍🍳"
  },
  {
    v: "1.11.7",
    titre: "📤 Partage ta liste de courses",
    texte: "Tu es à la maison et quelqu'un fait les courses ? Sur ta liste, le bouton « 📤 Partager la liste » envoie un lien (WhatsApp, SMS, mail…). La personne l'ouvre et voit ta liste rangée par rayon, avec des cases à cocher au fur et à mesure — sans compte ni appli à installer. Les articles que tu as déjà cochés arrivent déjà barrés. Pratique pour faire les courses à deux ! 🛒"
  },
  {
    v: "1.11.2",
    titre: "🍽️ Menus modulables repas par repas",
    texte: "Ton planning de la semaine devient sur-mesure ! Dès le formulaire, le bouton « ⚙️ Personnaliser par repas » te laisse choisir, pour chaque jour, si Midi et Soir sont absents, simples (1 plat) ou complets (entrée/plat/dessert). Et sur le planning : un sélecteur 👥 par repas pour le nombre de convives (lundi midi seul à 1, mardi soir à 4…) et un ⚙️ pour changer son format, le remplacer ou le retirer. La liste de courses cumule automatiquement les bonnes portions. À toi de composer ta semaine ! 👨‍🍳"
  },
  {
    v: "1.11.0",
    titre: "🎤 Vocal, bilan de la semaine & recettes similaires",
    texte: "Trois nouveautés ! 1) Un 🎤 micro dans la barre de recherche : dicte ta recherche, mains libres. 2) Sur ton menu de la semaine, un 📊 bilan s'affiche en tête : calories par jour, coût total et équilibre Nutri-Score. 3) En bas de chaque recette, une section « 🍽️ Tu aimeras aussi » te suggère automatiquement des plats proches. Bon appétit ! 👨‍🍳"
  },
  {
    v: "1.10.0",
    titre: "🔍 Filtres, collections & substitutions",
    texte: "Trois nouveautés d'un coup ! 1) Dans les recettes, filtre par ⏱ rapide, 💰 éco, 🥗 Nutri A/B, ⭐ facile ou 🌞 de saison — et trie par temps, coût ou calories. 2) Range tes favoris en collections (Noël, Healthy, Rapide…) pour t'y retrouver. 3) Sur chaque recette, un bloc « 💡 Pas d'un ingrédient ? » te propose des remplacements malins (beurre → huile, œuf → banane…). Bonne cuisine ! 👨‍🍳"
  },
  {
    v: "1.9.0",
    titre: "🧺 Ajoute tes propres courses",
    texte: "Dans Garde-manger → Liste de courses, une nouvelle section « 🧺 Mes articles » te laisse ajouter tout ce qui n'est pas lié à une recette — sopalin, couches, lessive… — avec les mêmes cases à cocher que les ingrédients. Ta liste de courses devient enfin complète et bonne pour tout le caddie !"
  },
  {
    v: "1.8.0",
    titre: "📤 Partage tes recettes préférées",
    texte: "Un nouveau bouton « 📤 Partager » est apparu sur chaque recette ! Envoie-la à tes proches sur WhatsApp, Messages ou par mail en un clic — avec un joli aperçu (photo + description). Pratique pour proposer le menu du week-end ou transmettre LA recette qui a fait l'unanimité. 😋"
  },
  {
    v: "1.7.0",
    titre: "👨‍🍳 Le mode cuisson est arrivé !",
    texte: "Sur n'importe quelle recette, appuie sur « 👨‍🍳 Lancer le mode cuisson » : les étapes s'affichent une par une en plein écran, en gros caractères, et l'écran ne s'éteint plus pendant que tu cuisines. Un minuteur se propose automatiquement quand une étape a une durée (« ⏱ Lancer le minuteur ») et te prévient quand c'est prêt. Mains pleines de farine ? Tout est lisible et à portée de pouce !"
  },
  {
    v: "1.3.24",
    titre: "🍱 Le batch cooking est arrivé !",
    texte: "Le principe : cuisiner toute sa semaine en une seule session, au lieu de s'y remettre chaque soir. Dans Garde-manger → Liste de courses, choisis tes recettes : tu vois le temps total de prép, ta liste de courses regroupée par rayon, et surtout le nouveau « 📋 Plan de prep » qui rassemble les étapes de toutes tes recettes par phase (mise en place → cuissons → assemblage → repos & conservation). Tu coupes tout d'un coup, tu lances les cuissons ensemble : un vrai gain de temps !"
  },
  {
    v: "1.3.0",
    titre: "📷 Les photos sont arrivées !",
    texte: "Tu peux maintenant ajouter tes photos de plats sur chaque recette et admirer celles de la communauté. Avec les commentaires, place à la cuisine collaborative !"
  },
  {
    v: "1.2.0",
    titre: "💬 Commentaires sur les recettes",
    texte: "Partage tes commentaires sur chaque recette (« j'ai mis moins de sucre, un peu de cannelle… ») et profite de celles des autres."
  },
  {
    v: "1.1.0",
    titre: "Mode Lunch box",
    texte: "Des déjeuners rapides, sains et à emporter, générés en un clic dans l'onglet Menus."
  }
];
const QDN_DERNIERE = (QUOI_DE_NEUF[0] && QUOI_DE_NEUF[0].v) || "";

function _qdnEchap(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function _qdnVue() { try { return localStorage.getItem("qdn_vue") || ""; } catch (e) { return ""; } }
function _qdnMarquerVue() { try { localStorage.setItem("qdn_vue", QDN_DERNIERE); } catch (e) {} }

function majPastilleQuoiDeNeuf() {
  const dot = document.getElementById("qdn-dot");
  if (!dot) return;
  dot.style.display = (_qdnVue() !== QDN_DERNIERE) ? "" : "none";
}

function ouvrirQuoiDeNeuf() {
  let m = document.getElementById("modal-qdn");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-qdn";
    m.setAttribute("style", "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px");
    m.onclick = (e) => { if (e.target === m) fermerQuoiDeNeuf(); };
    document.body.appendChild(m);
  }
  const items = QUOI_DE_NEUF.map((n, i) => {
    const recent = (i === 0);
    return '<div style="background:rgba(255,255,255,' + (recent ? '.05' : '.03') + ');border-radius:12px;padding:12px;margin-bottom:10px' + (recent ? '' : ';opacity:.7') + '">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
        '<span style="font-size:11px;font-weight:600;color:' + (recent ? 'var(--accent-soft,#ff8fb3)' : '#b3b0b8') + ';background:' + (recent ? 'rgba(var(--accent-rgb),.18)' : 'rgba(255,255,255,.08)') + ';padding:2px 8px;border-radius:20px">v' + _qdnEchap(n.v) + '</span>' +
        (recent ? '<span style="font-size:11px;color:#88858f">nouveau</span>' : '') +
      '</div>' +
      '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:3px">' + _qdnEchap(n.titre) + '</div>' +
      '<p style="font-size:13px;color:#cfccd4;margin:0;line-height:1.5">' + _qdnEchap(n.texte) + '</p>' +
    '</div>';
  }).join("");
  m.innerHTML = '<div style="background:#211e26;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;max-width:420px;width:100%;max-height:80vh;overflow:auto">' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">' +
      '<span style="font-size:18px">✨</span>' +
      '<span style="font-size:17px;font-weight:600;color:#fff;flex:1">Quoi de neuf ?</span>' +
      '<button onclick="fermerQuoiDeNeuf()" aria-label="Fermer" style="background:none;border:none;color:#b3b0b8;font-size:24px;line-height:1;cursor:pointer;padding:0 4px">×</button>' +
    '</div>' +
    items +
    '<p style="font-size:11px;color:#88858f;margin:10px 2px 0;line-height:1.5">Seules les nouveautés importantes apparaissent ici.</p>' +
  '</div>';
  m.style.display = "flex";
  _qdnMarquerVue();
  majPastilleQuoiDeNeuf();
}
function fermerQuoiDeNeuf() { const m = document.getElementById("modal-qdn"); if (m) m.style.display = "none"; }

document.addEventListener("DOMContentLoaded", majPastilleQuoiDeNeuf);
window.ouvrirQuoiDeNeuf = ouvrirQuoiDeNeuf;
window.fermerQuoiDeNeuf = fermerQuoiDeNeuf;
window.majPastilleQuoiDeNeuf = majPastilleQuoiDeNeuf;
