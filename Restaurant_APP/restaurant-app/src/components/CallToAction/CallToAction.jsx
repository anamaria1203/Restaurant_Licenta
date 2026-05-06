import './CallToAction.css'
import { useState } from 'react'

const CallToAction = () => {
  const [showGate, setShowGate] = useState(false)

  const userLogat = (() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })()

  const handleRezervare = () => {
    if (userLogat && userLogat.tip === 'client') {
      window.location.href = '/rezervare'
    } else {
      setShowGate(true)
    }
  }

  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>
      <div className="cta-content">
        <div className="section-tag">Villa Ana Ristorante</div>
        <h2>Esti gata pentru o experienta de neuitat?</h2>
        <p>
          Rezerva masa ta astazi si lasa-ne sa iti oferim o seara
          pe care nu o vei uita. Where Every Meal Tells a Story.
        </p>
        <div className="cta-butoane">
          <button className="cta-btn-primary" onClick={handleRezervare}>Rezerva Acum</button>
        </div>
      </div>

      {showGate && (
        <div className="cta-gate-overlay" onClick={() => setShowGate(false)}>
          <div className="cta-gate-card" onClick={e => e.stopPropagation()}>
            <button className="cta-gate-close" onClick={() => setShowGate(false)}>✕</button>
            <h3>Este necesar un cont</h3>
            <p>Pentru a face o rezervare la Villa Ana Ristorante ai nevoie de un cont de client.</p>
            <div className="cta-gate-butoane">
              <a href="/login?mod=login" className="cta-gate-btn-primary">Conectează-te</a>
              <a href="/login?mod=signup" className="cta-gate-btn-secondary">Creează cont nou</a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CallToAction