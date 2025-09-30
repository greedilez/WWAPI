import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Ссылка на Keitaro лендинг
const KEITARO_URL = "https://a-origin.pilotphrasebook.click/lander/pilotphrasebook-Policy";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(KEITARO_URL, { redirect: "follow" });
    const html = await response.text();

    const baseUrl = new URL(response.url); // получаем финальный URL после редиректов
    let imageUrl = "";

    // Ищем первую картинку
    const imgIndex = html.indexOf("<img");
    if (imgIndex !== -1) {
      const srcIndex = html.indexOf("src=", imgIndex);
      if (srcIndex !== -1) {
        const startQuote = html[srcIndex + 4];
        const endQuote = html.indexOf(startQuote, srcIndex + 5);
        let imgPath = html.substring(srcIndex + 5, endQuote).trim();

        // Строим абсолютный URL изображения
        const fullUrl = new URL(imgPath, baseUrl); // используем URL из ответа
        imageUrl = fullUrl.href;
      }
    }

    res.json({
      image_url: imageUrl || "",
      offer_url: imageUrl ? "" : response.url,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch Keitaro URL" });
  }
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
