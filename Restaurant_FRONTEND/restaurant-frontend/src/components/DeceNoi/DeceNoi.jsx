import './DeceNoi.css'

const DeceNoi = () => {
  return (
    <section className="dece-noi-section">
      <div className="dece-noi-header">
        <div className="section-tag">De ce sa ne alegi</div>
        <h2>Experienta Villa Ana Ristorante</h2>
      </div>

      <div className="dece-noi-grid">
        <div className="dece-card">
          <div className="dece-icon">🌿</div>
          <h3>Ingrediente Proaspete</h3>
          <p>Selectam zilnic cele mai proaspete ingrediente locale si importate pentru a va oferi preparate de cea mai inalta calitate.</p>
        </div>

        <div className="dece-card">
          <div className="dece-icon">👨‍🍳</div>
          <h3>Chef cu Experienta</h3>
          <p>Bucatarul nostru executiv cu peste 12 ani de experienta imbina tehnicile clasice cu inspiratii moderne pentru fiecare preparat.</p>
        </div>

        <div className="dece-card">
          <div className="dece-icon">⚡</div>
          <h3>Rezervare Rapida</h3>
          <p>Rezervati masa in mai putin de 2 minute direct din aplicatie. Simplu, rapid si fara complicatii.</p>
        </div>

        <div className="dece-card">
          <div className="dece-icon">🤝</div>
          <h3>Serviciu Impecabil</h3>
          <p>Echipa noastra de ospátari amabili si profesionisti va asigura o experienta de neuitat la fiecare vizita.</p>
        </div>
      </div>
    </section>
  )
}

export default DeceNoi