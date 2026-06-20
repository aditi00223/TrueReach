function CommentViewer({ data }) {
  return (
    <div className="comment-viewer">
      {data.map((creator) => (
        <div key={creator.creator} className="comment-viewer-creator">
          <h3>{creator.creator}</h3>
          <div className="comment-columns">
            <div className="comment-column high-intent-column">
              <h4>🔥 High Intent</h4>
              <ul>
                {creator.sampleComments.highIntent.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </div>

            <div className="comment-column curious-column">
              <h4>🤔 Curious</h4>
              <ul>
                {creator.sampleComments.curious.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </div>

            <div className="comment-column generic-column">
              <h4>💬 Generic</h4>
              <ul>
                {creator.sampleComments.generic.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentViewer;