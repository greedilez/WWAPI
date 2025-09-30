import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Ваша ссылка на кейтаро
const KEITARO_URL = "https://a-origin.pilotphrasebook.click/pilotphrasebook-Policy";

app.get("/", async (req, res) => {
  try {
    // fetch встроенный в Node 18+
    const response = await fetch(KEITARO_URL, { redirect: "follow" });
    const html = await response.text();

    // ищем первую картинку просто через indexOf и substring
    const imgIndex = html.indexOf("<img");
    let imageUrl = "";
    if (imgIndex !== -1) {
      const srcIndex = html.indexOf("src=", imgIndex);
      if (srcIndex !== -1) {
        const startQuote = html[srcIndex + 4];
        const endQuote = html.indexOf(startQuote, srcIndex + 5);
        imageUrl = html.substring(srcIndex + 5, endQuote);
      }
    }

    if (imageUrl) {
      res.json({ image_url: imageUrl, offer_url: "" });
    } else {
      res.json({ image_url: "", offer_url: response.url });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch Keitaro URL" });
  }
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
