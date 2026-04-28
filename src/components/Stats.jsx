import './Stats.css'

const stats = [
  { value: '500K+', label: 'Active Learners' },
  { value: '10K+', label: 'Expert Courses' },
  { value: '150+', label: 'Countries Reached' },
  { value: '95%', label: 'Satisfaction Rate' },
]

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
