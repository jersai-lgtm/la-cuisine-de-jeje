// ============================================================
// whatsnew.js — "Quoi de neuf ?" (note d'informations) v1.2.0
// Bouton ⓘ dans l'en-tête. Pastille rouge tant que la dernière note
// n'a pas été lue (mémorisé en local, marche même sans compte).
//
// 👉 Pour annoncer une nouveauté : ajoute une entrée EN HAUT de QUOI_DE_NEUF
//    (avec un numéro de version plus récent). Pour un petit patch (ajout de
//    recettes…), n'ajoute rien : pas d'entrée = pas de pastille.
// ============================================================

// Les entrées portent leur traduction (titreEn / texteEn). On retombe sur le
// français si une entrée n'a pas encore la sienne : mieux vaut du français
// lisible qu'un trou dans le panneau.
function _qdnEN(n, champ) {
  return (window.LANG === "en" && n[champ + "En"]) ? n[champ + "En"] : n[champ];
}

const QUOI_DE_NEUF = [
  {
    v: "5.2.9",
    titre: "📥 Une recette trouvée sur le web ? Colle le lien",
    texte: "Fini de tout recopier à la main ! 📥 Dans « Ajouter une recette », un champ attend l'adresse de la page : colle le lien d'une recette trouvée sur le web, appuie sur Importer, et le formulaire se remplit tout seul — nom, temps, catégorie, ingrédients et étapes. Tu relis, tu corriges ce qui te chante, tu enregistres : rien n'est ajouté sans toi. ✍️ Les quantités sont même remises en forme au passage (« 250 g Farine » devient « Farine : 250 g ») et la description garde le nombre de parts d'origine et le site d'où vient la recette. 👨‍🍳 Deux autres nouveautés en cuisine : en mode Cuisiner, chaque étape rappelle maintenant sous la consigne les ingrédients dont elle parle, avec la quantité pour le nombre de convives choisi — plus besoin de remonter à la liste les mains pleines. 🔍 Et quand tu cherches plusieurs ingrédients à la fois sans rien trouver (« courgette chèvre miel »), l'appli te propose d'en lâcher un : « sans miel (3) », « sans courgette (10) ». Bonne cuisine ! 🍳",
    titreEn: "📥 Found a recipe on the web? Paste the link",
    texteEn: "No more copying it all out by hand! 📥 In « Add a recipe », a field is waiting for the page address: paste the link of a recipe you found on the web, tap Import, and the form fills itself in — name, time, category, ingredients and steps. You read it over, fix whatever you like, you save: nothing is added without you. ✍️ Quantities are even tidied up on the way (« 250 g Flour » becomes « Flour: 250 g ») and the description keeps the original serving count and the site the recipe came from. 👨‍🍳 Two more kitchen novelties: in Cook mode, each step now lists underneath it the ingredients it mentions, with the amount for the number of guests you picked — no more scrolling back to the list with full hands. 🔍 And when you search several ingredients at once and find nothing (« courgette goat cheese honey »), the app offers to drop one: « without honey (3) », « without courgette (10) ». Happy cooking! 🍳"
  },
  {
    v: "5.2.1",
    titre: "🧭 Une appli plus simple à prendre en main",
    texte: "Grand ménage côté confort ! 🧭 Fini les deux menus qui se marchaient dessus : une seule barre en bas, la même partout — 🏠 Accueil, 🍳 Recettes, ⭐ Favoris, 📅 Menus et 🥫 Garde-manger. Les recettes sont à un appui depuis n'importe où. 👤 En haut, un avatar regroupe la connexion, le thème, la couleur, la langue, l'aide, tes stats et « Ajouter une recette » : l'en-tête est passé de 191 à 65 px, soit une recette de plus visible dès l'ouverture. 🔍 Tout est aussi plus lisible et plus facile à viser : textes agrandis (les petites cartes de l'accueil surtout) et boutons à 44 px — à commencer par les − / + des portions, qu'on touche les doigts pleins de farine. 📖 La fiche recette s'ouvre maintenant sur sa photo, puis le titre, les portions et les ingrédients, avec une barre toujours visible en bas : 👨‍🍳 Cuisiner, 🛒 Courses et le partage. 🏡 Et l'accueil s'allège : une seule carte « Qu'est-ce qu'on mange ? » réunit le swipe, les envies et le quiz. Bonne cuisine ! 👨‍🍳",
    titreEn: "🧭 An app that's easier to get to grips with",
    texteEn: "A big tidy-up! 🧭 No more two menus treading on each other: a single bar at the bottom, the same everywhere — 🏠 Home, 🍳 Recipes, ⭐ Favourites, 📅 Menus and 🥫 Pantry. Recipes are one tap away from anywhere. 👤 At the top, an avatar gathers sign-in, theme, colour, language, help, your stats and « Add a recipe »: the header went from 191 to 65 px, one more recipe visible the moment you open the app. 🔍 Everything is also easier to read and to hit: bigger text (the small home cards especially) and 44 px buttons — starting with the − / + for servings, which you touch with floury fingers. 📖 The recipe page now opens on its photo, then the title, the servings and the ingredients, with a bar always visible at the bottom: 👨‍🍳 Cook, 🛒 Shopping and sharing. 🏡 And the home screen gets lighter: a single « What shall we eat? » card gathers the swipe, the cravings and the quiz. Happy cooking! 👨‍🍳"
  },
  {
    v: "4.10.9",
    titre: "🖨️ Imprime tes recettes + recherche plus futée",
    texte: "Trois nouveautés d'un coup ! 🖨️ Un bouton « Imprimer » débarque dans chaque fiche : tu obtiens une belle page A4 avec les ingrédients pour le nombre de convives que tu as choisi et les étapes numérotées — parfait à poser sur le plan de travail (ou à enregistrer en PDF). 🔍 La recherche fouille maintenant DANS les étapes : tape « sans four », « pain rassis » ou « anti-gaspi » et tu trouveras les recettes qui vont avec, même si ces mots ne sont pas dans le titre. ⚡ Et l'appli s'ouvre nettement plus vite : elle a maigri d'un tiers, surtout appréciable sur téléphone. Bonne cuisine ! 👨‍🍳",
    titreEn: "🖨️ Print your recipes + smarter search",
    texteEn: "Three novelties at once! 🖨️ A « Print » button lands on every recipe: you get a proper A4 page with the ingredients for the number of guests you chose and numbered steps — perfect to lay on the worktop (or to save as a PDF). 🔍 Search now digs INSIDE the steps: type « no oven », « stale bread » or « zero waste » and you will find the recipes that match, even when those words are not in the title. ⚡ And the app opens noticeably faster: it lost a third of its weight, which really shows on a phone. Happy cooking! 👨‍🍳"
  },
  {
    v: "4.5.7",
    titre: "📅 Planifie tes recettes dans ton agenda",
    texte: "Fini d'oublier ce que tu voulais cuisiner ! Sur chaque fiche recette, un nouveau bouton 📅 te permet de la planifier : choisis le jour et le moment (matin, midi, après-midi ou soir), et hop — l'événement s'ouvre tout prêt dans Google Agenda (ou en fichier .ics pour les autres calendriers), avec le temps de préparation et un lien qui rouvre direct la recette le jour J. 🛒 Bonus : sur la liste de courses, le bouton « 📅 Rappel courses » crée un rappel avec les recettes de ton panier. Plus aucune excuse pour le « qu'est-ce qu'on mange ce soir ? » ! 😄",
    titreEn: "📅 Plan your recipes in your calendar",
    texteEn: "No more forgetting what you meant to cook! On every recipe page, a new 📅 button lets you schedule it: pick the day and the moment (morning, midday, afternoon or evening), and there you go — the event opens ready-made in Google Calendar (or as an .ics file for other calendars), with the prep time and a link that reopens the recipe on the day. 🛒 Bonus: on the shopping list, the « 📅 Shopping reminder » button creates a reminder with the recipes in your basket. No excuse left for « what are we eating tonight? »! 😄"
  },
  {
    v: "3.4.8",
    titre: "🎨 Accueil en couleurs",
    texte: "L'accueil s'harmonise ! Chaque bloc a maintenant sa propre bannière colorée : 🗓️ La recette du jour en or (clique dessus pour l'ouvrir en grand), 🎯 Objectif kcal en vert, 🎭 De quoi t'as envie en violet, 🆕 Dernières recettes ajoutées en rose, 🕐 Dernières recettes vues en bleu-sarcelle, ✨ Suggestions pour toi en corail, 📅 Dernier menu généré en indigo, et 🌱 Le top du mois change de couleur selon la saison (vert au printemps, or en été, marron en automne, bleu en hiver). Plus facile de repérer chaque section d'un coup d'œil ! 🌈",
    titreEn: "🎨 A home screen in colour",
    texteEn: "The home screen comes together! Every block now has its own coloured banner: 🗓️ Recipe of the day in gold (tap it to open it full size), 🎯 Calorie target in green, 🎭 What do you fancy in purple, 🆕 Latest recipes added in pink, 🕐 Recently viewed in teal, ✨ Suggestions for you in coral, 📅 Last menu generated in indigo, and 🌱 Top of the month changes colour with the season (green in spring, gold in summer, brown in autumn, blue in winter). Much easier to spot each section at a glance! 🌈"
  },
  {
    v: "2.9.6",
    titre: "💪 Objectif : ton coach nutrition sportive",
    texte: "La catégorie « 🎯 Objectif kcal » (sur l'accueil) devient un vrai coach fitness ! Calcule tes calories à partir de ton métabolisme de base + activité (Mifflin-St Jeor), fixe ta cible protéines en g/kg, ton hydratation, et choisis ton but : 🔥 sèche, 🏋️ prise de masse, 💪 protéiné… Puis « 🍽️ Composer ma journée » te génère un menu complet (matin → soir) qui atteint pile tes calories et tes protéines, avec verrouillage des repas que tu aimes. Et 22 nouvelles recettes protéinées : skyr bowl, omelette de blancs, poulet/poisson maigres, boules protéinées, shake… 🏋️",
    titreEn: "💪 Target: your sports nutrition coach",
    texteEn: "The « 🎯 Calorie target » section (on the home screen) becomes a real fitness coach! Work out your calories from your basal metabolism + activity (Mifflin-St Jeor), set your protein target in g/kg, your hydration, and choose your goal: 🔥 cutting, 🏋️ bulking, 💪 high protein… Then « 🍽️ Build my day » generates a full menu (morning → evening) that hits your calories and your protein exactly, with the option to lock the meals you like. Plus 22 new high-protein recipes: skyr bowl, egg white omelette, lean chicken and fish, protein balls, shakes… 🏋️"
  },
  {
    v: "2.3.5",
    titre: "🌡️ Suggestions selon la météo + objectif kcal",
    texte: "« Qu'est-ce qu'on mange ? » s'adapte maintenant à la météo : par forte chaleur 🥵, on te remonte les plats frais (salades, taboulé…) ; par grand froid 🥶, les plats réconfortants. Et l'objectif nutritionnel a déménagé : sous « 🎭 De quoi t'as envie ? », fixe tes calories/jour (ex. 2200) et l'appli te propose direct des repas qui rentrent dedans. 👨‍🍳",
    titreEn: "🌡️ Suggestions that follow the weather + calorie target",
    texteEn: "« What shall we eat? » now adapts to the weather: in a heatwave 🥵 it brings up cool dishes (salads, tabbouleh…); in the cold 🥶, comforting ones. And the nutrition target has moved: under « 🎭 What do you fancy? », set your calories per day (say 2200) and the app suggests meals that fit straight away. 👨‍🍳"
  },
  {
    v: "2.3.1",
    titre: "🎭 De quoi t'as envie ? + Quiz de goûts",
    texte: "Deux façons ludiques de trouver quoi cuisiner ! En haut de l'accueil, choisis une envie — 🍲 Réconfortant, 🥗 Léger, 😋 Gourmand, 🌶️ Épicé, ⚡ Rapide, 🌍 Exotique — et hop, des recettes qui collent à ton humeur. Et le 🎯 Quiz de goûts (4 petites questions) te recommande des recettes faites pour toi. Bon appétit ! 👨‍🍳",
    titreEn: "🎭 What do you fancy? + Taste quiz",
    texteEn: "Two playful ways to find what to cook! At the top of the home screen, pick a craving — 🍲 Comforting, 🥗 Light, 😋 Indulgent, 🌶️ Spicy, ⚡ Quick, 🌍 Exotic — and there you are, recipes that match your mood. And the 🎯 Taste quiz (four short questions) recommends recipes made for you. Enjoy! 👨‍🍳"
  },
  {
    v: "2.2.6",
    titre: "🍷 Accords boissons + 🎯 objectif nutri",
    texte: "Deux nouveautés dans chaque recette ! 🍷 Une suggestion d'accord boisson (vin, bière… toujours avec une option sans alcool). Et 🎯 tu peux fixer un objectif nutritionnel (calories/jour + un focus comme léger ou protéiné) : la fiche te montre alors quelle part de ta journée représente la recette, et si elle colle à ton objectif. Bon appétit ! 👨‍🍳",
    titreEn: "🍷 Drink pairings + 🎯 nutrition target",
    texteEn: "Two novelties in every recipe! 🍷 A suggested drink pairing (wine, beer… always with an alcohol-free option). And 🎯 you can set a nutrition target (calories per day plus a focus such as light or high protein): the recipe page then shows you how much of your day it represents, and whether it fits your target. Enjoy! 👨‍🍳"
  },
  {
    v: "2.2.5",
    titre: "🌗 Thème clair",
    texte: "Tu préfères le clair ? Un nouveau bouton 🌙 / ☀️ en haut de l'appli bascule entre le mode sombre (par défaut) et un tout nouveau mode clair, tout doux pour les yeux en journée. Ton choix est mémorisé. 🎨",
    titreEn: "🌗 Light theme",
    texteEn: "Prefer it light? A new 🌙 / ☀️ button at the top of the app switches between dark mode (the default) and a brand new light mode, gentle on the eyes in daylight. Your choice is remembered. 🎨"
  },
  {
    v: "2.2.4",
    titre: "🍽️ « Qu'est-ce qu'on mange ? »",
    texte: "Plus d'inspiration en panne ! En haut de l'accueil, un nouveau bouton ouvre un mode découverte façon swipe : fais défiler des recettes (👈 passer, 👉 voir), et quand une te fait envie, hop, la fiche s'ouvre. Ça suit ton profil (allergènes, régime) et la saison. Parfait pour décider du dîner en 30 secondes. 😋",
    titreEn: "🍽️ « What shall we eat? »",
    texteEn: "Never out of ideas again! At the top of the home screen, a new button opens a swipe-style discovery mode: flick through recipes (👈 skip, 👉 look), and when one tempts you, the page opens. It follows your profile (allergens, diet) and the season. Perfect for deciding on dinner in 30 seconds. 😋"
  },
  {
    v: "2.1.10",
    titre: "🔔 Reçois la recette du jour",
    texte: "Tu peux maintenant activer les notifications : chaque jour à 11h30, une idée de recette du jour t'attend directement sur ton téléphone (un clic et la recette s'ouvre) ! Et le samedi, un petit rappel si tu as une liste de courses en cours. Pour activer : accepte la petite invitation 🔔 qui apparaît, ou recharge l'appli. Tu peux refuser, c'est sans engagement. 👨‍🍳",
    titreEn: "🔔 Get the recipe of the day",
    texteEn: "You can now switch on notifications: every day at 11:30, an idea for the recipe of the day waits for you right on your phone (one tap and the recipe opens)! And on Saturdays, a gentle reminder if you have a shopping list on the go. To switch it on: accept the little 🔔 invitation when it appears, or reload the app. You can say no, there is no commitment. 👨‍🍳"
  },
  {
    v: "2.1.7",
    titre: "📸 Partage une recette en image",
    texte: "Nouveau bouton 📸 Image dans chaque recette : il crée une jolie carte (photo, titre, temps, niveau) prête à poster en story ou en feed Instagram, ou à envoyer à tes amis. Un clic et c'est partagé (ou enregistré). Fais voir tes plats ! 🤳",
    titreEn: "📸 Share a recipe as an image",
    texteEn: "A new 📸 Image button in every recipe: it creates a handsome card (photo, title, time, difficulty) ready to post as an Instagram story or in your feed, or to send to your friends. One tap and it is shared (or saved). Show off your cooking! 🤳"
  },
  {
    v: "2.1.6",
    titre: "⚖️ Mesures américaines (oz, cups, °F)",
    texte: "Dans chaque recette, un bouton ⚖️ convertit les quantités en mesures impériales : grammes → oz/lb, ml → fl oz/cups, et les températures °C → °F. Pratique pour cuisiner avec des mesures américaines (ou pour nos amis anglophones). Un clic pour basculer, un clic pour revenir. 👨‍🍳",
    titreEn: "⚖️ US measurements (oz, cups, °F)",
    texteEn: "In every recipe, a ⚖️ button converts the quantities to imperial measurements: grams → oz/lb, ml → fl oz/cups, and temperatures °C → °F. Handy for cooking with American measurements (or for our English-speaking friends). One tap to switch, one tap to come back. 👨‍🍳"
  },
  {
    v: "2.1.4",
    titre: "🗓️ Recette du jour + nouveaux filtres",
    texte: "Deux nouveautés ! 🗓️ En haut de l'accueil, une « recette du jour » mise en avant — elle change chaque jour, de quoi trouver l'inspiration sans réfléchir. Et dans les Recettes, 3 nouveaux filtres rapides : 🌾 Sans gluten, 🪶 Léger (moins de 500 kcal/portion) et 💪 Protéiné (au moins 20 g de protéines/portion). Un clic et tu ne vois que ce qui te convient. Bon appétit ! 👨‍🍳",
    titreEn: "🗓️ Recipe of the day + new filters",
    texteEn: "Two novelties! 🗓️ At the top of the home screen, a « recipe of the day » takes centre stage — it changes every day, inspiration without thinking about it. And in Recipes, three new quick filters: 🌾 Gluten-free, 🪶 Light (under 500 kcal a serving) and 💪 High protein (at least 20 g of protein a serving). One tap and you only see what suits you. Enjoy! 👨‍🍳"
  },
  {
    v: "2.0.6",
    titre: "🎉 Filtre par occasion",
    texte: "Dans les Recettes, une nouvelle ligne de filtres « occasions » : 🥂 Apéro, 🔥 Barbecue, 🧺 Pique-nique, 🎄 Fêtes. Un clic et tu ne vois que les recettes qui collent au moment — pratique pour préparer ton barbecue du week-end ou ton repas de fête. Bonus : l'app démarre plus vite (les traductions anglaises ne se chargent que si tu passes en anglais). 👨‍🍳",
    titreEn: "🎉 Filter by occasion",
    texteEn: "In Recipes, a new row of « occasion » filters: 🥂 Drinks, 🔥 Barbecue, 🧺 Picnic, 🎄 Festive. One tap and you only see the recipes that suit the moment — handy for getting your weekend barbecue or your festive meal ready. Bonus: the app starts faster (the English translations now load only if you switch to English). 👨‍🍳"
  },
  {
    v: "1.11.55",
    titre: "🤖 L'assistant vocal répond à tes questions",
    texte: "Le micro 🎙️ de la barre de recherche est un vrai assistant : appuie et parle (français ou anglais). Ouvre une recette, demande une idée (« une recette italienne rapide sans miel », « un dessert pas cher »), navigue, ajoute à ta liste ou génère un menu — à la voix. En cuisson, pilote tout sans toucher l'écran (« suivant », « va à l'étape 3 », « minuteur dix minutes », « temps restant ») et active l'écoute mains-libres 👂. Nouveau : pose-lui tes questions de cuisine — « c'est quoi un bain-marie ? », « par quoi remplacer le mascarpone ? », « qu'est-ce que je fais avec du poulet et des courgettes ? » — il te répond. 🤖 (réponses IA quand tu es connecté·e)",
    titreEn: "🤖 The voice assistant answers your questions",
    texteEn: "The 🎙️ microphone in the search bar is a real assistant: press and speak (French or English). Open a recipe, ask for an idea (« a quick Italian recipe without honey », « a cheap dessert »), navigate, add to your list or generate a menu — by voice. While cooking, drive everything without touching the screen (« next », « go to step 3 », « timer ten minutes », « time left ») and switch on hands-free listening 👂. New: ask it your cooking questions — « what is a bain-marie? », « what can replace mascarpone? », « what do I make with chicken and courgettes? » — and it answers. 🤖 (AI answers when you are signed in)"
  },
  {
    v: "1.11.21",
    titre: "🆕 Vocal, minuteurs, budget, garde-manger…",
    texte: "Grosse mise à jour ! 🔊 En mode cuisson, les étapes se lisent à voix haute (mains libres) et tu peux lancer plusieurs minuteurs en parallèle. 💰 Ta liste de courses affiche son budget estimé. 📤 Partage ton menu de la semaine comme ta liste. 🥕 Le vide-frigo ignore les basiques (sel, huile…) et ajoute les ingrédients manquants à ta liste en un clic. 📦 Et un nouveau garde-manger te prévient avant que tes aliments ne périment ! 👨‍🍳",
    titreEn: "🆕 Voice, timers, budget, pantry…",
    texteEn: "A big update! 🔊 In cook mode, the steps are read aloud (hands free) and you can run several timers at once. 💰 Your shopping list shows its estimated budget. 📤 Share your weekly menu just like your list. 🥕 The fridge-emptier ignores the basics (salt, oil…) and adds the missing ingredients to your list in one tap. 📦 And a new pantry warns you before your food goes off! 👨‍🍳"
  },
  {
    v: "1.11.7",
    titre: "📤 Partage ta liste de courses",
    texte: "Tu es à la maison et quelqu'un fait les courses ? Sur ta liste, le bouton « 📤 Partager la liste » envoie un lien (WhatsApp, SMS, mail…). La personne l'ouvre et voit ta liste rangée par rayon, avec des cases à cocher au fur et à mesure — sans compte ni appli à installer. Les articles que tu as déjà cochés arrivent déjà barrés. Pratique pour faire les courses à deux ! 🛒",
    titreEn: "📤 Share your shopping list",
    texteEn: "You are at home and someone else is doing the shopping? On your list, the « 📤 Share the list » button sends a link (WhatsApp, text, email…). They open it and see your list sorted by aisle, with boxes to tick as they go — no account, no app to install. The items you already ticked arrive crossed out. Handy for shopping as a pair! 🛒"
  },
  {
    v: "1.11.2",
    titre: "🍽️ Menus modulables repas par repas",
    texte: "Ton planning de la semaine devient sur-mesure ! Dès le formulaire, le bouton « ⚙️ Personnaliser par repas » te laisse choisir, pour chaque jour, si Midi et Soir sont absents, simples (1 plat) ou complets (entrée/plat/dessert). Et sur le planning : un sélecteur 👥 par repas pour le nombre de convives (lundi midi seul à 1, mardi soir à 4…) et un ⚙️ pour changer son format, le remplacer ou le retirer. La liste de courses cumule automatiquement les bonnes portions. À toi de composer ta semaine ! 👨‍🍳",
    titreEn: "🍽️ Menus you shape meal by meal",
    texteEn: "Your weekly plan becomes made to measure! Right from the form, the « ⚙️ Customise by meal » button lets you choose, for each day, whether Midday and Evening are skipped, simple (one dish) or full (starter/main/dessert). And on the plan: a 👥 selector per meal for the number of guests (Monday lunch alone at 1, Tuesday dinner at 4…) and a ⚙️ to change its format, replace it or remove it. The shopping list adds up the right servings automatically. Your week, your way! 👨‍🍳"
  },
  {
    v: "1.11.0",
    titre: "🎤 Vocal, bilan de la semaine & recettes similaires",
    texte: "Trois nouveautés ! 1) Un 🎤 micro dans la barre de recherche : dicte ta recherche, mains libres. 2) Sur ton menu de la semaine, un 📊 bilan s'affiche en tête : calories par jour, coût total et équilibre Nutri-Score. 3) En bas de chaque recette, une section « 🍽️ Tu aimeras aussi » te suggère automatiquement des plats proches. Bon appétit ! 👨‍🍳",
    titreEn: "🎤 Voice, weekly summary & similar recipes",
    texteEn: "Three novelties! 1) A 🎤 microphone in the search bar: dictate your search, hands free. 2) On your weekly menu, a 📊 summary appears at the top: calories per day, total cost and Nutri-Score balance. 3) At the bottom of every recipe, a « 🍽️ You will also like » section automatically suggests close dishes. Enjoy! 👨‍🍳"
  },
  {
    v: "1.10.0",
    titre: "🔍 Filtres, collections & substitutions",
    texte: "Trois nouveautés d'un coup ! 1) Dans les recettes, filtre par ⏱ rapide, 💰 éco, 🥗 Nutri A/B, ⭐ facile ou 🌞 de saison — et trie par temps, coût ou calories. 2) Range tes favoris en collections (Noël, Healthy, Rapide…) pour t'y retrouver. 3) Sur chaque recette, un bloc « 💡 Pas d'un ingrédient ? » te propose des remplacements malins (beurre → huile, œuf → banane…). Bonne cuisine ! 👨‍🍳",
    titreEn: "🔍 Filters, collections & substitutions",
    texteEn: "Three novelties at once! 1) In the recipes, filter by ⏱ quick, 💰 cheap, 🥗 Nutri A/B, ⭐ easy or 🌞 in season — and sort by time, cost or calories. 2) File your favourites into collections (Christmas, Healthy, Quick…) to find your way around. 3) On every recipe, a « 💡 Out of an ingredient? » block suggests clever swaps (butter → oil, egg → banana…). Happy cooking! 👨‍🍳"
  },
  {
    v: "1.9.0",
    titre: "🧺 Ajoute tes propres courses",
    texte: "Dans Garde-manger → Liste de courses, une nouvelle section « 🧺 Mes articles » te laisse ajouter tout ce qui n'est pas lié à une recette — sopalin, couches, lessive… — avec les mêmes cases à cocher que les ingrédients. Ta liste de courses devient enfin complète et bonne pour tout le caddie !",
    titreEn: "🧺 Add your own shopping items",
    texteEn: "In Pantry → Shopping list, a new « 🧺 My items » section lets you add everything that is not tied to a recipe — kitchen roll, nappies, washing powder… — with the same tick boxes as the ingredients. Your shopping list is finally complete, good for the whole trolley!"
  },
  {
    v: "1.8.0",
    titre: "📤 Partage tes recettes préférées",
    texte: "Un nouveau bouton « 📤 Partager » est apparu sur chaque recette ! Envoie-la à tes proches sur WhatsApp, Messages ou par mail en un clic — avec un joli aperçu (photo + description). Pratique pour proposer le menu du week-end ou transmettre LA recette qui a fait l'unanimité. 😋",
    titreEn: "📤 Share your favourite recipes",
    texteEn: "A new « 📤 Share » button has appeared on every recipe! Send it to your family and friends on WhatsApp, Messages or by email in one tap — with a handsome preview (photo + description). Handy for proposing the weekend menu or passing on THE recipe everyone agreed on. 😋"
  },
  {
    v: "1.7.0",
    titre: "👨‍🍳 Le mode cuisson est arrivé !",
    texte: "Sur n'importe quelle recette, appuie sur « 👨‍🍳 Lancer le mode cuisson » : les étapes s'affichent une par une en plein écran, en gros caractères, et l'écran ne s'éteint plus pendant que tu cuisines. Un minuteur se propose automatiquement quand une étape a une durée (« ⏱ Lancer le minuteur ») et te prévient quand c'est prêt. Mains pleines de farine ? Tout est lisible et à portée de pouce !",
    titreEn: "👨‍🍳 Cook mode has arrived!",
    texteEn: "On any recipe, tap « 👨‍🍳 Start cook mode »: the steps appear one by one, full screen, in large type, and the screen stops going dark while you cook. A timer is offered automatically when a step has a duration (« ⏱ Start the timer ») and tells you when it is ready. Hands covered in flour? Everything is readable and within thumb's reach!"
  },
  {
    v: "1.3.24",
    titre: "🍱 Le batch cooking est arrivé !",
    texte: "Le principe : cuisiner toute sa semaine en une seule session, au lieu de s'y remettre chaque soir. Dans Garde-manger → Liste de courses, choisis tes recettes : tu vois le temps total de prép, ta liste de courses regroupée par rayon, et surtout le nouveau « 📋 Plan de prep » qui rassemble les étapes de toutes tes recettes par phase (mise en place → cuissons → assemblage → repos & conservation). Tu coupes tout d'un coup, tu lances les cuissons ensemble : un vrai gain de temps !",
    titreEn: "🍱 Batch cooking has arrived!",
    texteEn: "The idea: cook your whole week in one session, instead of starting again every evening. In Pantry → Shopping list, choose your recipes: you see the total prep time, your shopping list grouped by aisle, and above all the new « 📋 Prep plan » which gathers the steps of all your recipes by phase (mise en place → cooking → assembly → resting & storing). You chop everything at once, you start the cooking together: a real time saver!"
  },
  {
    v: "1.3.0",
    titre: "📷 Les photos sont arrivées !",
    texte: "Tu peux maintenant ajouter tes photos de plats sur chaque recette et admirer celles de la communauté. Avec les commentaires, place à la cuisine collaborative !",
    titreEn: "📷 Photos have arrived!",
    texteEn: "You can now add your own photos of your dishes to every recipe, and admire the community's. Together with the comments, let collaborative cooking begin!"
  },
  {
    v: "1.2.0",
    titre: "💬 Commentaires sur les recettes",
    texte: "Partage tes commentaires sur chaque recette (« j'ai mis moins de sucre, un peu de cannelle… ») et profite de celles des autres.",
    titreEn: "💬 Comments on recipes",
    texteEn: "Share your comments on every recipe (« I used less sugar and a pinch of cinnamon… ») and enjoy everyone else's."
  },
  {
    v: "1.1.0",
    titre: "Mode Lunch box",
    texte: "Des déjeuners rapides, sains et à emporter, générés en un clic dans l'onglet Menus.",
    titreEn: "Lunch box mode",
    texteEn: "Quick, healthy lunches to take away, generated in one tap from the Menus tab."
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
      '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:3px">' + _qdnEchap(_qdnEN(n, "titre")) + '</div>' +
      '<p style="font-size:13px;color:var(--text-2);margin:0;line-height:1.5">' + _qdnEchap(_qdnEN(n, "texte")) + '</p>' +
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
