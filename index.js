import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/offer", (req, res) => {
  res.json({
    image_url: "https://via.placeholder.com/300x200.png?text=Mock+Image",
    offer_url: "https://example.com/offer"
  });
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
