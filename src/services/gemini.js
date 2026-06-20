const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: { temperature: 0 },
});

/**
 * Classifies a batch of comments into highIntent / curious / generic.
 * Sends them all in ONE prompt (cheaper + faster than one-call-per-comment).
 */
async function classifyComments(comments) {
 const prompt = `
You are classifying social media comments by PURCHASE INTENT for a brand analytics tool.

Classify each comment into EXACTLY one category. Be strict and consistent:

- "highIntent": ANY comment asking about price, cost ("how much", "kitna", "price kya hai"), links, buying, ordering, availability, shipping, COD, sizing, stock, discount codes, or restocking — even if phrased as a casual question. If it relates to ACQUIRING the product, it is highIntent. This includes comparison questions about which product to buy ("which is better, should I get this or that").
- "curious": asks about quality, reviews, ingredients, side effects, durability, suitability, skin type, or general opinions about the product — interested in info, but not asking how to get it.
- "generic": emojis, compliments, vague reactions, greetings, or comments unrelated to the product — no purchase or product-research signal at all.

Examples:
"how much is this" -> highIntent
"any side effects?" -> curious
"can I get this in india" -> highIntent
"comparing this with the other brand, which is better" -> highIntent
"good morning everyone" -> generic
"is it good quality" -> curious
"😍😍😍" -> generic

Comments (numbered):
${comments.map((c, i) => `${i + 1}. ${c}`).join("\n")}

Respond with ONLY a JSON array, no markdown, no explanation, in this exact format:
[{"index": 1, "category": "highIntent"}, {"index": 2, "category": "generic"}, ...]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip markdown fences if Gemini wraps the JSON in ```json ... ```
  const cleaned = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Failed to parse Gemini response as JSON: " + text.slice(0, 200));
  }

  return parsed; // [{ index, category }, ...]
}

module.exports = { classifyComments };