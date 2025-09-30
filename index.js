import express from "express";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

// ссылка на кейтаро
const KEITARO_URL = "https://a-origin.pilotphrasebook.click/pilotphrasebook-Policy";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(KEITARO_URL, { redirect: "follow" });
    const html = await response.text();
    const $ = cheerio.load(html);

    const imgSrc = $("img").first().attr("src");

    if (imgSrc) {
      res.json({
        image_url: imgSrc,
        offer_url: ""
      });
    } else {
      res.json({
        image_url: "",
        offer_url: response.url
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
