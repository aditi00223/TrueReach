function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="no-comments">No comments in this category</p>;
  }

  return (
    <ul>
      {comments.map((comment, i) => (
        <li key={i}>{comment}</li>
      ))}
    </ul>
  );
}

function CommentViewer({ data }) {
  return (
    <div className="comment-viewer">
      {data.map((creator) => (
        <div key={creator.creator} className="comment-viewer-creator">
          <h3>{creator.creator}</h3>
          <div className="comment-columns">
            <div className="comment-column high-intent-column">
              <h4>🔥 High Intent</h4>
              <CommentList comments={creator.sampleComments?.highIntent} />
            </div>

            <div className="comment-column curious-column">
              <h4>🤔 Curious</h4>
              <CommentList comments={creator.sampleComments?.curious} />
            </div>

            <div className="comment-column generic-column">
              <h4>💬 Generic</h4>
              <CommentList comments={creator.sampleComments?.generic} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentViewer;