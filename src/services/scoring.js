/**
 * Takes raw comments + Gemini's classification results and produces
 * the final scored object matching the JSON contract.
 *
 * Scoring formula:
 *   highIntent comments count fully toward the score
 *   curious comments count at half weight (interested, not ready yet)
 *   generic comments count for nothing
 *
 * score = ((highIntent * 1.0) + (curious * 0.5)) / totalComments * 100
 */
function calculateScore(creatorName, comments, classifications) {
  const breakdown = { highIntent: 0, curious: 0, generic: 0 };
  const sampleComments = { highIntent: [], curious: [], generic: [] };

  classifications.forEach(({ index, category }) => {
    const commentText = comments[index - 1]; // Gemini uses 1-based indexing
    if (!commentText || !breakdown.hasOwnProperty(category)) return;

    breakdown[category]++;

    // keep up to 5 example comments per category for the frontend's comment viewer
    if (sampleComments[category].length < 5) {
      sampleComments[category].push(commentText);
    }
  });

  const total = comments.length;
  const rawScore =
    ((breakdown.highIntent * 1.0) + (breakdown.curious * 0.5)) / total * 100;

  return {
    creator: creatorName,
    totalComments: total,
    score: Math.round(rawScore * 10) / 10, // round to 1 decimal
    breakdown,
    sampleComments,
  };
}

module.exports = { calculateScore };