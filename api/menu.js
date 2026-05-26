// api/menu.js — Proxy Vercel pour Gemini (gratuit)
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://jersai-lgtm.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt manquant" });

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2000,
        }
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Retourner au format compatible avec le code existant
    return res.status(200).json({
      content: [{ type: "text", text }]
    });

  } catch (err) {
    console.error("Erreur proxy:", err);
    return res.status(500).json({ error: err.message });
  }
}
