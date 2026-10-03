function StatCard({ label, value, tone, suffix = "" }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-icon">•</div>
      <div>
        <p>{label}</p>
        <h3>
          {value}
          {suffix ? <span>{suffix}</span> : null}
        </h3>
      </div>
    </div>
  );
}

export default function SummaryCards({ total, solved, revise, unsolved, solvedPercent }) {
  return (
    <section className="summary-grid">
      <StatCard label="Total Questions" value={total} tone="primary" />
      <StatCard label="Solved" value={solved} tone="success" />
      <StatCard label="To Revise" value={revise} tone="warning" />
      <StatCard label="Not Solved" value={unsolved} tone="danger" />
      <StatCard label="Solved %" value={solvedPercent} suffix="%" tone="info" />
    </section>
  );
}