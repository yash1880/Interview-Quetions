export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  categories,
  difficultyOptions,
  statusOptions,
  onReset,
}) {
  return (
    <section className="filter-bar">
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedDifficulty}
        onChange={(event) => setSelectedDifficulty(event.target.value)}
      >
        <option value="All">All Difficulties</option>
        {difficultyOptions.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(event) => setSelectedStatus(event.target.value)}
      >
        <option value="All">All Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </section>
  );
}
