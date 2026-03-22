import './StatisticiBar.css'

const StatisticiBar = () => {
  return (
    <div className="stats-bar">
      <div className="stat">
        <div className="stat-num">18+</div>
        <div className="stat-label">Ani de experiență</div>
      </div>

      <div className="stat-divider"></div>

      <div className="stat">
        <div className="stat-num">80+</div>
        <div className="stat-label">Preparate unice</div>
      </div>

      <div className="stat-divider"></div>

      <div className="stat">
        <div className="stat-num">4.9</div>
        <div className="stat-label">Rating clienți</div>
      </div>

      <div className="stat-divider"></div>

      <div className="stat">
        <div className="stat-num">50K+</div>
        <div className="stat-label">Clienți fericiți</div>
      </div>
    </div>
  )
}

export default StatisticiBar