import { useState, useEffect } from 'react';
import './App.css';
import CreatorCard from './components/CreatorCard';
import IntentChart from './components/IntentChart';
import CommentViewer from './components/CommentViewer';
import BestPickBanner from './components/BestPickBanner';
import { getCreatorScores } from './services/api';

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCreatorScores();
        setCreators(data);
      } catch (err) {
        setError('Could not load data. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Purchase-Intent Signal Scorer</h1>
          <p>Analyzing comments... this may take a few seconds ⏳</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Purchase-Intent Signal Scorer</h1>
          <p>{error}</p>
        </header>
      </div>
    );
  }

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
          {creators.map((creator) => (
            <CreatorCard key={creator.creator} creator={creator} />
          ))}
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Intent Comparison</h2>
        <IntentChart data={creators} />
      </section>

      {/* Comment Viewer Section */}
      <section className="comment-viewer-section">
        <h2>Sample Comments</h2>
        <CommentViewer data={creators} />
      </section>

      {/* Best Pick Banner */}
      <section className="best-pick-section">
        <BestPickBanner data={creators} />
      </section>
    </div>
  );
}

export default App;