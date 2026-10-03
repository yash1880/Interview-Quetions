const statusClass = {
  Solved: "status solved",
  "To Revise": "status revise",
  "Not Solved": "status unsolved",
};

export default function QuestionTable({
  questions,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (!questions.length) {
    return (
      <section className="empty-state">
        <h3>No questions match your filters.</h3>
        <p>Try changing the search or filters to view more records.</p>
      </section>
    );
  }

  return (
    <section className="table-card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Last Practiced</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>
                  <div className="question-cell">
                    <strong>{question.title}</strong>
                    <small>{question.notes ? question.notes.slice(0, 60) : "No notes yet"}</small>
                  </div>
                </td>
                <td>{question.category}</td>
                <td>
                  <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td>
                  <select
                    className={statusClass[question.status] || "status"}
                    value={question.status}
                    onChange={(event) => onStatusChange(question.id, event.target.value)}
                  >
                    <option value="Solved">Solved</option>
                    <option value="To Revise">To Revise</option>
                    <option value="Not Solved">Not Solved</option>
                  </select>
                </td>
                <td>{question.lastPracticed || "—"}</td>
                <td>
                  <div className="action-group">
                    <button type="button" className="link-btn" onClick={() => onView(question)}>
                      View
                    </button>
                    <button type="button" className="link-btn" onClick={() => onEdit(question)}>
                      Edit
                    </button>
                    <button type="button" className="link-btn danger" onClick={() => onDelete(question.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
