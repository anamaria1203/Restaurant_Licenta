import './Recenzii.css'

const Recenzii = () => {
  return (
    <section className="recenzii-section">
      <div className="recenzii-header">
        <div className="section-tag">Ce spun clientii nostri</div>
        <h2>Experiente de neuitat</h2>
      </div>

      <div className="recenzii-grid">
        <div className="recenzie-featured">
          <div className="ghilimele">"</div>
          <p className="recenzie-text">
            O experienta culinara absolut remarcabila. Fiecare preparat
            a fost o capodopera — de la prezentare pana la gust.
            Atmosfera eleganta si serviciul impecabil au transformat
            cina noastra intr-o amintire de neuitat. Cu siguranta vom reveni!
          </p>
          <div className="recenzie-autor">
            <div className="autor-avatar">MA</div>
            <div className="autor-info">
              <div className="autor-nume">Maria Alexandrescu</div>
              <div className="autor-data">Februarie 2026</div>
            </div>
            <div className="stele">★★★★★</div>
          </div>
        </div>

        <div className="recenzii-mici">
          <div className="recenzie-mica">
            <div className="ghilimele-mic">"</div>
            <p className="recenzie-text-mic">
              Bisque de Homar a fost cel mai bun pe care l-am gustat
              vreodata. Locul perfect pentru o seara speciala!
            </p>
            <div className="recenzie-autor-mic">
              <div className="autor-avatar-mic">RP</div>
              <div className="autor-info">
                <div className="autor-nume">Radu Popescu</div>
                <div className="autor-data">Ianuarie 2026</div>
              </div>
              <div className="stele-mici">★★★★★</div>
            </div>
          </div>

          <div className="recenzie-mica">
            <div className="ghilimele-mic">"</div>
            <p className="recenzie-text-mic">
              Mancarea Saptamanii Italiene a fost o revelatie!
              Paste proaspete si o atmosfera de vis. Recomand cu caldura!
            </p>
            <div className="recenzie-autor-mic">
              <div className="autor-avatar-mic">EI</div>
              <div className="autor-info">
                <div className="autor-nume">Elena Ionescu</div>
                <div className="autor-data">Martie 2026</div>
              </div>
              <div className="stele-mici">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recenzii