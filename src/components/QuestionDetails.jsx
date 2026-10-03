export default function QuestionDetails({ question, onClose, onStatusChange }) {
  if (!question) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel details-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Question details</p>
            <h2>{question.title}</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>

        <div className="details-grid">
          <div>
            <span>Category</span>
            <strong>{question.category}</strong>
          </div>
          <div>
            <span>Difficulty</span>
            <strong>{question.difficulty}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{question.status}</strong>
          </div>
          <div>
            <span>Last Practiced</span>
            <strong>{question.lastPracticed || "—"}</strong>
          </div>
        </div>

        <div className="notes-box">
          <h3>Notes</h3>
          <p>{question.notes || "No notes added yet."}</p>
        </div>

        <div className="details-footer">
          <select
            value={question.status}
            onChange={(event) => onStatusChange(question.id, event.target.value)}
          >
            <option value="Solved">Solved</option>
            <option value="To Revise">To Revise</option>
            <option value="Not Solved">Not Solved</option>
          </select>
          <button type="button" className="primary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
