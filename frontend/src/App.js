import './App.css';
import mockData from './data/mockData.json';
import CreatorCard from './components/CreatorCard';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>Purchase-Intent Signal Scorer</h1>
        <p>See which creators drive real buying intent</p>
      </header>

      {/* Creator Cards Section */}
      <section className="creator-cards-section">
        <h2>Creators</h2>
        <div className="creator-cards-grid">
          {mockData.map((creator) => (
            <CreatorCard key={creator.creator} creator={creator} />
          ))}
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Intent Comparison</h2>
        {/* IntentChart component will go here */}
      </section>

      {/* Comment Viewer Section */}
      <section className="comment-viewer-section">
        <h2>Sample Comments</h2>
        {/* CommentViewer component will go here */}
      </section>

      {/* Best Pick Banner */}
      <section className="best-pick-section">
        {/* BestPickBanner component will go here */}
      </section>
    </div>
  );
}

export default App;