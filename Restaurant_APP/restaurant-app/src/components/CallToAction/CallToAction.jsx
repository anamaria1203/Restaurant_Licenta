import './CallToAction.css'

const CallToAction = () => {
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
     <button className="cta-btn-primary">Rezerva Acum</button>
    </div>
      </div>
    </section>
  )
}

export default CallToAction