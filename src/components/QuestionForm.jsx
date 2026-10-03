function Field({ label, children, required = false }) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <em>*</em> : null}
      </span>
      {children}
    </label>
  );
}

export default function QuestionForm({
  isOpen,
  onClose,
  editingId,
  formData,
  setFormData,
  onSubmit,
  categoryOptions,
  difficultyOptions,
  statusOptions,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">{editingId ? "Update question" : "Add new question"}</p>
            <h2>{editingId ? "Edit Question" : "New Question"}</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close form">
            ×
          </button>
        </div>

        <form className="question-form" onSubmit={onSubmit}>
          <Field label="Question title" required>
            <input
              type="text"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              placeholder="e.g. What is useEffect in React?"
              required
            />
          </Field>

          <div className="field-row two-col">
            <Field label="Category" required>
              <select
                value={formData.category}
                onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                required
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Difficulty" required>
              <select
                value={formData.difficulty}
                onChange={(event) => setFormData({ ...formData, difficulty: event.target.value })}
                required
              >
                {difficultyOptions.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="field-row two-col">
            <Field label="Status" required>
              <select
                value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Last practiced">
              <input
                type="date"
                value={formData.lastPracticed}
                onChange={(event) => setFormData({ ...formData, lastPracticed: event.target.value })}
              />
            </Field>
          </div>

          <Field label="Notes">
            <textarea
              rows="5"
              value={formData.notes}
              onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
              placeholder="Add your summary, approach, or revision notes here..."
            />
          </Field>

          <div className="modal-actions">
            <button type="button" className="ghost-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {editingId ? "Save Changes" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
