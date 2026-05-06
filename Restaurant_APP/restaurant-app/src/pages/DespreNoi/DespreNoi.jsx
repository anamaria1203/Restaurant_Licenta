import './DespreNoi.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const ECHIPA = [
  {
    nume: 'Antonio Ferretti',
    rol: 'Chef Executiv',
    descriere: 'Format la Culinary Institute din Milano, Antonio aduce 18 ani de experiență în bucătăriile cu stele Michelin din Italia și Franța. Pasiunea sa pentru ingrediente de sezon definește identitatea culinară a restaurantului.',
    imagine: 'chef.jpg'
  },
  {
    nume: 'Elena Moretti',
    rol: 'Sommelier Principal',
    descriere: 'Certificată WSET Level 4, Elena curatoriază o colecție de peste 200 de etichete selecționate din cele mai renumite crame europene. Recomandările sale transformă fiecare masă într-o experiență completă.',
    imagine: 'PersoanaCuPahar.jpg'
  },
  {
    nume: 'Sophie Laurent',
    rol: 'Patiser Executiv',
    descriere: 'Formată la École Ferrandi din Paris, Sophie îmbină tehnica clasică franceză cu ingrediente românești de sezon. Creațiile sale au câștigat premiul "Best Dessert Experience" în 2022 și 2023.',
    imagine: 'patiser.jpg'
  },
  {
    nume: 'Andreea Constantin',
    rol: 'Manager Restaurant',
    descriere: 'Cu 10 ani în industria ospitalității de lux, Andreea orchestrează fiecare detaliu al experienței tale — de la rezervare până la ultima înghițitură de espresso. Zâmbetul ei este primul lucru pe care îl vei vedea.',
    imagine: 'receptionista.jpg'
  }
]

const GALERIE = [
  { imagine: 'mesrOrdonate.jpg', titlu: 'Sala principală' },
  { imagine: 'preparatElegant.jpg', titlu: 'Arta pe farfurie' },
  { imagine: 'atmosferaCuLumanari.jpg', titlu: 'Seară la lumânări' },
  { imagine: 'echipaResaturantInActiune.jpg', titlu: 'Echipa în acțiune' }

]

const DespreNoi = () => {
  return (
    <div className="despre-page">
      <Navbar />

      {/* HERO */}
      <div className="despre-hero">
        <img src="/images/despre/atmosfera_Restaurant.jpg" alt="Villa Ana" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="despre-hero-content">
          <div className="despre-tag">Villa Ana Ristorante · Est. 2005</div>
          <h1>Povestea Noastră</h1>
          <p>O călătorie culinară inspirată din inima Italiei, adusă la tine acasă</p>
        </div>
      </div>

      <div className="despre-body">

        {/* POVESTEA */}
        <section className="poveste-section">
          <div className="poveste-text">
            <div className="section-label">Originile noastre</div>
            <h2>Un vis devenit realitate în 2005</h2>
            <p>
              Villa Ana Ristorante s-a născut din dragostea pentru gastronomia italiancă autentică
              și din dorința de a oferi României o experiență culinară cu adevărat rafinată.
              Fondatorii noștri, Ana și Marco, s-au întâlnit pe coasta Amalfi în 2001,
              unde Marco conducea bucătăria unui restaurant cu stea Michelin.
            </p>
            <p>
              Împreună au visat un loc unde tradiția italiancă întâlnește ospitalitatea românească —
              unde fiecare masă este o sărbătoare, iar fiecare ingredient spune o poveste.
              Cinci ani de pregătire, trei călătorii prin Toscana și Sicilia, și o pasiune imensă
              mai târziu, Villa Ana și-a deschis porțile pe 12 martie 2005.
            </p>
            <p>
              Astăzi, după aproape două decenii, rămânem fideli aceleiași filozofii: <em>materie
              primă excepțională, tehnici clasice, emoție autentică</em>.
            </p>
            <div className="poveste-stats">
              <div className="pstat">
                <span className="pstat-num">18+</span>
                <span className="pstat-label">Ani de excelență</span>
              </div>
              <div className="pstat">
                <span className="pstat-num">50k+</span>
                <span className="pstat-label">Clienți fericiți</span>
              </div>
              <div className="pstat">
                <span className="pstat-num">3×</span>
                <span className="pstat-label">Premiat național</span>
              </div>
            </div>
          </div>
          <div className="poveste-imagine">
            <img src="/images/despre/pozaVintage.jpg" alt="Povestea Villa Ana" />
            <div className="poveste-quote">
              <span className="quote-ghilimele">"</span>
              Tot ce e bun pe pământ vine de Sus — noi doar îl aducem la masa ta
              <span className="quote-autor">—Ana, fondatoareara</span>
            </div>
          </div>
        </section>

        {/* FILOZOFIA */}
        <section className="filozofie-section">
          <div className="filozofie-header">
            <div className="section-label">Ce ne definește</div>
            <h2>Filozofia noastră culinară</h2>
          </div>
          <div className="filozofie-grid">
            <div className="fcard">
              <div className="fcard-icon">🌿</div>
              <h3>Ingrediente de sezon</h3>
              <p>Lucrăm exclusiv cu producători locali selectați și importatori specializați din Italia. Meniul nostru se schimbă odată cu anotimpurile — pentru că natura știe cel mai bine ce e bun.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon">🔥</div>
              <h3>Tehnici clasice</h3>
              <p>Fiecare preparat este rezultatul unor tehnici perfecționate de secole în bucătăriile italiene și mediteraneene. Nu reinventăm roata — o lustruim până strălucește.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon">🍷</div>
              <h3>Armonie desăvârșită</h3>
              <p>Fiecare fel de mâncare vine cu o recomandare de vin aleasă cu grijă de sommelierul nostru. La Villa Ana, băutura nu însoțește mâncarea — o completează.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon">✦</div>
              <h3>Experiență totală</h3>
              <p>De la lumina lumânărilor la muzica discretă de fundal, fiecare detaliu al atmosferei este gândit pentru a crea cadrul perfect al unei seri memorabile.</p>
            </div>
          </div>
        </section>

        {/* ECHIPA */}
        <section className="echipa-section">
          <div className="echipa-header">
            <div className="section-label">Oamenii din spatele magiei</div>
            <h2>Echipa noastră</h2>
            <p>Fiecare preparat excepțional începe cu oameni excepționali</p>
          </div>
          <div className="echipa-grid">
            {ECHIPA.map((m, i) => (
              <div key={i} className="mcard">
                <div className="mcard-img-wrapper">
                  <img src={`/images/despre/${m.imagine}`} alt={m.nume} />
                  <div className="mcard-overlay" />
                </div>
                <div className="mcard-info">
                  <div className="mcard-rol">{m.rol}</div>
                  <h3>{m.nume}</h3>
                  <p>{m.descriere}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIE */}
        <section className="galerie-section">
          <div className="galerie-header">
            <div className="section-label">O privire în interior</div>
            <h2>Galerie</h2>
          </div>
          <div className="galerie-grid">
            {GALERIE.map((g, i) => (
              <div key={i} className={`gitem gitem-${i}`}>
                <img src={`/images/despre/${g.imagine}`} alt={g.titlu} />
                <div className="gitem-overlay">
                  <span>{g.titlu}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default DespreNoi
