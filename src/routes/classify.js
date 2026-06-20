const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { classifyComments } = require("../services/gemini");
const { calculateScore } = require("../services/scoring");

const dataPath = path.join(__dirname, "../../data/comments.json");

/**
 * Demo-safe fallback: simple keyword-based classifier.
 * Used ONLY if the Gemini API call fails (rate limit, network issue, etc.)
 * so the demo never shows a blank screen or error.
 */
function fallbackClassify(comments) {
  const highIntentWords = ["price", "link", "buy", "kitna", "cod", "available", "stock", "discount", "order", "ship", "size"];
  const curiousWords = ["worth", "review", "quality", "compare", "durab", "suit", "honest", "good"];

  return comments.map((text, i) => {
    const lower = text.toLowerCase();
    let category = "generic";
    if (highIntentWords.some(w => lower.includes(w))) category = "highIntent";
    else if (curiousWords.some(w => lower.includes(w))) category = "curious";
    return { index: i + 1, category };
  });
}

router.get("/", async (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const { creators } = JSON.parse(raw);

    if (!creators || creators.length === 0) {
      return res.status(400).json({ error: "No creator data found." });
    }

    const results = [];

    for (const creatorData of creators) {
      const { name, comments } = creatorData;
      let classifications;

      try {
        classifications = await classifyComments(comments);
      } catch (err) {
        console.error(`Gemini failed for ${name}, using fallback classifier:`, err.message);
        classifications = fallbackClassify(comments);
      }

      const scored = calculateScore(name, comments, classifications);
      results.push(scored);
    }

    // sort by score descending so frontend can easily show the "best pick" first
    results.sort((a, b) => b.score - a.score);

    res.json({ results });
  } catch (err) {
    console.error("Classification route error:", err);
    res.status(500).json({ error: "Failed to classify comments." });
  }
});

module.exports = router;