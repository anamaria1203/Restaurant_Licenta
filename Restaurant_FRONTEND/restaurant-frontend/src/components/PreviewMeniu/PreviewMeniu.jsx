import './PreviewMeniu.css'

const PreviewMeniu = () => {
  return (
    <section className="menu-section">
      <div className="section-header">
        <div className="section-tag">Specialitățile noastre</div>
        <h2>Din inima bucătăriei</h2>
        <p>Preparate cu pasiune, servite cu drag</p>
      </div>

      <div className="menu-grid">
        <div className="menu-card menu-card-1">
          <div className="menu-card-bg"></div>
          <div className="menu-card-overlay"></div>
          <div className="menu-card-content">
            <div className="menu-cat">Fructe de Mare</div>
            <div className="menu-name">Scoici Saint Jacques</div>
            <div className="menu-price">de la 95 RON</div>
          </div>
        </div>

        <div className="menu-card menu-card-2">
          <div className="menu-card-bg"></div>
          <div className="menu-card-overlay"></div>
          <div className="menu-card-content">
            <div className="menu-cat">Supe Fine</div>
            <div className="menu-name">Bisque de Homar</div>
            <div className="menu-price">de la 65 RON</div>
          </div>
        </div>

        <div className="menu-card menu-card-3">
          <div className="menu-card-bg"></div>
          <div className="menu-card-overlay"></div>
          <div className="menu-card-content">
            <div className="menu-cat">Deserturi</div>
            <div className="menu-name">Crème Brûlée</div>
            <div className="menu-price">de la 45 RON</div>
          </div>
        </div>
      </div>

      <div className="menu-btn-container">
        <button className="btn-outline-dark">Vezi Meniul Complet</button>
      </div>
    </section>
  )
}

export default PreviewMeniu