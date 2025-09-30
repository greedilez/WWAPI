import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

// ссылка на кейтаро (одна на всё)
const KEITARO_URL = "https://a-origin.pilotphrasebook.click/pilotphrasebook-Policy";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(KEITARO_URL, { redirect: "follow" });
    const html = await response.text();
    const $ = cheerio.load(html);

    // ищем первую картинку
    const imgSrc = $("img").first().attr("src");

    if (imgSrc) {
      // если есть картинка
      res.json({
        image_url: imgSrc,
        offer_url: ""
      });
    } else {
      // картинок нет → значит это оффер
      res.json({
        image_url: "",
        offer_url: response.url // реальный конечный оффер (после редиректа кейтаро)
      });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch Keitaro URL" });
  }
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
