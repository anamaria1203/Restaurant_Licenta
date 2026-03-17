import './MancareaSaptamanii.css'
import paste from './paste.jpg'
import orez from './orez.jpg'
import tiramisu from './tiramisu.jpg'

const MancareaSaptamanii = () => {
  return (
    <section className="saptamana-section">
      <div className="saptamana-overlay"></div>
      <div className="saptamana-content">
        <div className="saptamana-tag">Tema Săptămânii</div>
        <h2>Săptămâna Italiană</h2>
        <p className="saptamana-date">1 — 7 Martie 2026</p>
        <p className="saptamana-desc">
          Descoperiți aromele autentice ale Italiei — paste proaspete,
          risotto cremos și tiramisu clasic, pregătite cu ingrediente
          importate direct din Italia.
        </p>
        <div className="saptamana-preparate">
          <div className="preparat-card">
            <img src={paste} alt="Tagliatelle al Ragu" className="preparat-img" />
            <div className="preparat-name">Tagliatelle al Ragù</div>
            <div className="preparat-price">72 RON</div>
          </div>
          <div className="preparat-card">
            <img src={orez} alt="Risotto ai Funghi" className="preparat-img" />
            <div className="preparat-name">Risotto ai Funghi</div>
            <div className="preparat-price">68 RON</div>
          </div>
          <div className="preparat-card">
            <img src={tiramisu} alt="Tiramisu Classico" className="preparat-img" />
            <div className="preparat-name">Tiramisu Classico</div>
            <div className="preparat-price">45 RON</div>
          </div>
        </div>
        <button className="btn-saptamana">Vezi Meniul Complet</button>
      </div>
    </section>
  )
}

export default MancareaSaptamanii