import './PaginaPrincipala.css'

const PaginaPrincipala = () => {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-img"></div>
      <div className="hero-img-overlay"></div>

      <div className="hero-content">
        <div className="hero-tag">Where Every Meal Tells a Story</div>
        <h1>Savurează <em>arta</em> culinară autentică</h1>
        <p>Vă invităm să descoperiți o lume a gusturilor rafinate, unde fiecare preparat este o poveste spusă cu pasiune și ingrediente alese cu grijă.</p>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default PaginaPrincipala