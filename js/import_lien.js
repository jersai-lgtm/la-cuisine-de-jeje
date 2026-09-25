// ============================================================
//  import_lien.js — Importer une recette depuis un lien (v5.2.7)
//  Coller l'adresse d'une page de recette remplit le formulaire
//  « Ajouter une recette » : on relit, on corrige, on enregistre.
//
//  Le navigateur ne peut pas lire la page d'un autre site (CORS) :
//  c'est le worker Cloudflare (route /import) qui va la chercher,
//  en préférant le balisage schema.org/Recipe à l'IA.
// ============================================================
(function () {
  "use strict";

  const PROXY = "https://la-cuisine-de-jeje.jerome-sainthot.workers.dev";

  // Les pays en anglais que renvoient les sites (recipeCuisine) vers nos clés.
  const PAYS_EN = {
    french: "france", italian: "italie", japanese: "japon", thai: "thailande",
    mexican: "mexique", indian: "inde", chinese: "chine", greek: "grece",
    spanish: "espagne", moroccan: "maroc", lebanese: "liban", american: "usa",
    vietnamese: "vietnam", korean: "coree", portuguese: "portugal",
    german: "allemagne", british: "angleterre", english: "angleterre",
    belgian: "belgique", swiss: "suisse", turkish: "turquie", russian: "russie",
    brazilian: "bresil", "middle eastern": "liban", mediterranean: "grece",
  };

  const UNITES = ["g", "kg", "mg", "ml", "cl", "dl", "l", "cs", "cc",
    "pincee", "pincees", "sachet", "sachets", "gousse", "gousses",
    "tranche", "tranches", "boite", "boites", "verre", "verres",
    "tasse", "tasses", "feuille", "feuilles", "branche", "branches",
    "brin", "brins", "botte", "bottes", "poignee", "poignees",
    "filet", "filets", "cube", "cubes", "bocal", "pot", "pots"];

  function sansAccent(s) {
    return String(s || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function etat(txt, type) {
    const el = document.getElementById("c-lien-etat");
    if (!el) return;
    el.textContent = txt || "";
    el.className = "contrib-import-etat" + (type ? " est-" + type : "");
  }

  // Les sites écrivent « 250 g Farine » ou « 1 sachet de levure » ; le
  // formulaire attend « Nom : quantité ». Si la ligne ne se laisse pas lire,
  // on la garde telle quelle — elle reste juste, seulement moins rangée.
  function reformaterIngredient(s) {
    const t = String(s || "").replace(/\s+/g, " ").trim();
    if (!t || t.indexOf(":") !== -1) return t;
    const m = /^((?:\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?|[½¼¾⅓⅔⅛])(?:\s*(?:à|a|-)\s*\d+(?:[.,]\d+)?)?)\s+(.*)$/.exec(t);
    if (!m) return t;
    let qte = m[1].trim();
    let reste = m[2].trim();
    // « c. à s. », « cuillères à soupe » : l'unité tient en plusieurs mots.
    const cuillere = /^(c\.?\s*à\.?\s*[sc]\.?|cuill[eè]res?\s+à\s+(?:soupe|caf[ée]))\s*/i.exec(reste);
    if (cuillere) {
      qte += " " + cuillere[1].trim();
      reste = reste.slice(cuillere[0].length).trim();
    } else {
      const premier = reste.split(" ")[0] || "";
      if (UNITES.indexOf(sansAccent(premier).replace(/[^a-z]/g, "")) !== -1) {
        qte += " " + premier;
        reste = reste.slice(premier.length).trim();
      }
    }
    reste = reste.replace(/^(?:de\s|d['’]|du\s|des\s)/i, "").trim();
    if (!reste) return t;
    return reste.charAt(0).toUpperCase() + reste.slice(1) + " : " + qte;
  }

  function paysLisible(p) {
    const t = (typeof normalizeText === "function")
      ? normalizeText(p) : sansAccent(p).replace(/[^a-z0-9 ]/g, " ").trim();
    if (!t) return "";
    if (typeof SYNONYMES_PAYS !== "undefined" && SYNONYMES_PAYS[t]) return SYNONYMES_PAYS[t];
    return PAYS_EN[t] || t;
  }

  function poser(id, valeur) {
    const el = document.getElementById(id);
    if (el && valeur) el.value = valeur;
  }

  function remplirFormulaire(r, lien) {
    let hote = "";
    try { hote = new URL(lien).hostname.replace(/^www\./, ""); } catch (e) {}

    poser("c-nom", r.nom);
    poser("c-emoji", r.emoji);
    poser("c-temps", r.temps);
    poser("c-pays", paysLisible(r.pays));

    const cat = document.getElementById("c-cat");
    if (cat && r.cat && [...cat.options].some(o => o.value === r.cat)) cat.value = r.cat;
    const niv = document.getElementById("c-niveau");
    if (niv && r.niveau && [...niv.options].some(o => o.value === r.niveau)) niv.value = r.niveau;

    // La recette perso ne met pas les quantités à l'échelle : si la page
    // comptait pour 6, il faut le dire, sinon les grammes ne veulent rien dire.
    const bouts = [];
    if (r.description) bouts.push(r.description);
    if (r.portions && r.portions !== 4) bouts.push("Pour " + r.portions + " personnes.");
    if (hote) bouts.push("D'après " + hote + ".");
    poser("c-desc", bouts.join(" "));

    poser("c-ingredients", (r.ingredients || []).map(reformaterIngredient).join("\n"));
    poser("c-etapes", (r.etapes || []).join("\n"));

    // Le formulaire est loin sous le champ de lien sur un téléphone.
    const nom = document.getElementById("c-nom");
    if (nom && nom.scrollIntoView) nom.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function messageErreur(status, msg) {
    if (status === 401) return "Session expirée — reconnecte-toi 🙏";
    if (status === 429) return "Trop d'imports cette heure-ci, réessaie plus tard 😅";
    if (status === 404) return "L'import n'est pas encore activé sur le serveur.";
    if (status === 501) return "L'import n'est pas encore activé sur le serveur.";
    return msg || "Lecture impossible — essaie un autre lien.";
  }

  window.importerRecetteDepuisLien = async function () {
    const champ = document.getElementById("c-lien");
    const bouton = document.getElementById("c-lien-btn");
    const lien = (champ && champ.value || "").trim();

    if (!lien) { etat("Colle d'abord l'adresse de la page.", "ko"); return; }
    if (!/^https?:\/\/.+\..+/i.test(lien)) {
      etat("Ce n'est pas une adresse de page (elle commence par https://).", "ko");
      return;
    }
    if (!window.currentUser || typeof window.currentUser.getIdToken !== "function") {
      etat("Connecte-toi pour utiliser l'import.", "ko");
      if (typeof afficherToast === "function") afficherToast("Connecte-toi pour importer une recette");
      return;
    }

    const avant = bouton ? bouton.textContent : "";
    if (bouton) { bouton.disabled = true; bouton.textContent = "Lecture…"; }
    etat("Je lis la page…", "encours");

    try {
      const idToken = await window.currentUser.getIdToken();
      const rep = await fetch(PROXY + "/import", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + idToken },
        body: JSON.stringify({ url: lien }),
      });
      let data = {};
      try { data = await rep.json(); } catch (e) {}
      if (!rep.ok || !data.ok || !data.recette) {
        // Toute réponse de la route porte route:"import". Sans ce marqueur, le
        // worker en ligne est plus vieux que l'app : ce n'est pas le lien qui
        // est en cause, c'est le serveur qui ne connaît pas encore l'import.
        const routeAbsente = (rep.status !== 401 && (!data || data.route !== "import"));
        etat("⚠️ " + (routeAbsente
          ? "L'import n'est pas encore activé sur le serveur."
          : messageErreur(rep.status, data && data.error && data.error.message)), "ko");
        return;
      }
      remplirFormulaire(data.recette, data.lien || lien);
      const n = (data.recette.etapes || []).length;
      etat("✅ Recette lue (" + (data.recette.ingredients || []).length + " ingrédients, " + n +
        (n > 1 ? " étapes" : " étape") + "). Relis et corrige avant d'enregistrer.", "ok");
      if (typeof afficherToast === "function") afficherToast("📥 Recette importée — à toi de relire !");
    } catch (e) {
      etat("⚠️ Serveur injoignable — réessaie dans un moment.", "ko");
    } finally {
      if (bouton) { bouton.disabled = false; bouton.textContent = avant || "Importer"; }
    }
  };

  // Entrée dans le champ = lancer l'import (et surtout ne pas soumettre autre chose).
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const c = document.getElementById("c-lien");
    if (c && document.activeElement === c) { e.preventDefault(); window.importerRecetteDepuisLien(); }
  });
})();
