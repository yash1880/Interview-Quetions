export default function Header({ search, setSearch }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark">IQT</div>
        <div>
          <p className="eyebrow">Student tracker</p>
          <h1>Interview Questions Tracker</h1>
        </div>
      </div>

      <div className="topbar-tools">
        <label className="search-wrap" aria-label="Search questions">
          <span>⌕</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or keyword"
          />
        </label>

        
      </div>
    </header>
  );
}
