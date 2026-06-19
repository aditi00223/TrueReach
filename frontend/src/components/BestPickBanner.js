function BestPickBanner({ data }) {
  // Sabse zyada score wale creator ko dhoondo
  const bestCreator = data.reduce((best, current) =>
    current.score > best.score ? current : best
  );

  return (
    <div className="best-pick-banner">
      <span className="best-pick-label">🏆 Best Pick</span>
      <h3>{bestCreator.creator}</h3>
      <p>
        Highest purchase-intent score: <strong>{bestCreator.score}</strong> —{' '}
        {bestCreator.breakdown.highIntent} high-intent comments out of{' '}
        {bestCreator.totalComments}
      </p>
    </div>
  );
}

export default BestPickBanner;