function CreatorCard({ creator }) {
  return (
    <div className="creator-card">
      <h3>{creator.creator}</h3>
      <p className="score">Score: {creator.score}</p>
      <p className="total-comments">{creator.totalComments} comments analyzed</p>

      <div className="breakdown">
        <span className="high-intent">🔥 High Intent: {creator.breakdown.highIntent}</span>
        <span className="curious">🤔 Curious: {creator.breakdown.curious}</span>
        <span className="generic">💬 Generic: {creator.breakdown.generic}</span>
      </div>
    </div>
  );
}

export default CreatorCard;