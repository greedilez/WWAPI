import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    image_url: "https://raw.githubusercontent.com/greedilez/WWAPI/main/360_F_198733249_hjyzxGkoeqCmBw5ZBE1j8T0wj8oO2r2Z.jpg",
    offer_url: "https://example.com/offer"
  });
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
