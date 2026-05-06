import './Echipa.css'
import echipaImg from '../../assets/images/echipa.jpg'
import clientiImg from '../../assets/images/clienti.jpg'
import ospatariImg from '../../assets/images/ospatari.jpg'

const Echipa = () => {
  return (
    <section className="echipa-section">
      <div className="echipa-header">
        <div className="section-tag">Oamenii nostri</div>
        <h2>O familie unita</h2>
        <p>In spatele fiecarui preparat exceptional se afla o echipa dedicata, pasionata si mereu zambatoare</p>
      </div>

      <div className="echipa-content">
        <div className="echipa-text">
          <h3>Serviciu din suflet, la fiecare vizita</h3>
          <p>
            La Villa Ana Ristorante, ospátarii nostri nu sunt doar angajati —
            sunt ambasadorii experientei noastre culinare. Fiecare membru
            al echipei este instruit sa ofere atentie personalizata fiecarui
            client, asigurandu-se ca fiecare vizita devine o amintire placuta.
          </p>
          <p>
            De la bucatari la ospátari si manageri, toti impartasim aceeasi
            pasiune pentru excelenta. Ne mandrim cu o echipa stabila si
            fericita, convinsi ca un personal multumit ofera servicii
            exceptionale.
          </p>
          <div className="echipa-stats">
            <div className="echipa-stat">
              <div className="echipa-stat-num">15+</div>
              <div className="echipa-stat-label">Membri in echipa</div>
            </div>
            <div className="echipa-stat">
              <div className="echipa-stat-num">98%</div>
              <div className="echipa-stat-label">Clienti multumiti</div>
            </div>
            <div className="echipa-stat">
              <div className="echipa-stat-num">18+</div>
              <div className="echipa-stat-label">Ani de experienta</div>
            </div>
          </div>
        </div>

        <div className="echipa-poze">
          <div className="poza-mare">
            <img src={echipaImg} alt="Echipa Villa Ana" className="echipa-img-mare" />
          </div>
          <div className="poze-mici">
            <div className="poza-mica">
              <img src={clientiImg} alt="Clienti multumiti" className="echipa-img-mica" />
            </div>
            <div className="poza-mica">
              <img src={ospatariImg} alt="Ospatari profesionisti" className="echipa-img-mica" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Echipa