import './MeniulLunii.css'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getLunaActiva, getPreparateLunare, getMeniu } from '../../services/api'

const TARI_META = {
  spaniola:      { titlu: 'Luna Spaniolă',      culoare: '#4a1a0a', descriere: 'Pasiunea și vivacitatea Spaniei în fiecare farfurie — tapas, paella și churros care îți vor încânta simțurile.' },
  turceasca:     { titlu: 'Luna Turcească',     culoare: '#3a1a0a', descriere: 'Bogăția aromelor Orientului Mijlociu — condimente exotice, grătare perfecte și deserturi cu miere și nuci.' },
  moldoveneasca: { titlu: 'Luna Moldovenească', culoare: '#1a3a1a', descriere: 'Căldura și simplitatea bucătăriei moldovenești — rețete transmise din generație în generație, cu ingrediente de la țară.' },
  japoneza:      { titlu: 'Luna Japoneză',      culoare: '#2a1a1a', descriere: 'Precizia și minimalismul bucătăriei japoneze — umami pur, ingrediente de excepție și prezentare ca o operă de artă.' },
  norvegiana:    { titlu: 'Luna Norvegiană',    culoare: '#0d1a2a', descriere: 'Puritatea și prospețimea bucătăriei nordice — pește proaspăt din fiorduri, carne de vânat și deserturi cu fructe de pădure.' },
}

const SUBCATEGORII_BAUTURI = ['Vinuri', 'Whisky', 'Rom', 'Cocktailuri', 'Beri', 'Sucuri', 'Ceaiuri']

const MeniulLunii = () => {
  const [lunaActiva, setLunaActiva] = useState('spaniola')
  const [preparate, setPreparate] = useState([])
  const [deserturi, setDeserturi] = useState([])
  const [bauturi, setBauturi] = useState([])
  const [subcatBautura, setSubcatBautura] = useState('Vinuri')
  const [loadingPreparate, setLoadingPreparate] = useState(true)
  const [loadingBauturi, setLoadingBauturi] = useState(true)

  useEffect(() => {
    getLunaActiva()
      .then(data => setLunaActiva(data.tara))
      .catch(() => setLunaActiva('spaniola'))
  }, [])

  useEffect(() => {
    setLoadingPreparate(true)
    getPreparateLunare(lunaActiva)
      .then(data => {
        const lista = Array.isArray(data) ? data : []
        setPreparate(lista.filter(p => !p.este_desert))
        setDeserturi(lista.filter(p => p.este_desert))
      })
      .catch(() => { setPreparate([]); setDeserturi([]) })
      .finally(() => setLoadingPreparate(false))
  }, [lunaActiva])

  useEffect(() => {
    setLoadingBauturi(true)
    getMeniu('Bauturi', subcatBautura)
      .then(data => setBauturi(Array.isArray(data) ? data : []))
      .catch(() => setBauturi([]))
      .finally(() => setLoadingBauturi(false))
  }, [subcatBautura])

  const meta = TARI_META[lunaActiva] || TARI_META['spaniola']

  return (
    <div className="meniu-lunii-page">
      <Navbar />

      <div className="ml-hero" style={{ background: meta.culoare }}>
        <div className="ml-hero-overlay" />
        <div className="ml-hero-content">
          <div className="ml-tag">Meniul Lunii · Martie 2026</div>
          <h1>{meta.titlu}</h1>
          <p>{meta.descriere}</p>
          <div className="ml-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="ml-body">

        <section className="ml-sectiune">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Preparate principale</div>
            <h2>Feluri de mâncare</h2>
          </div>
          {loadingPreparate ? (
            <div className="ml-loading">Se încarcă...</div>
          ) : (
            <div className="ml-grid">
              {preparate.map(p => (
                <div key={p.id} className="ml-card">
                  {p.imagine && (
                    <div className="ml-card-img">
                      <img src={p.imagine} alt={p.nume} />
                    </div>
                  )}
                  <div className="ml-card-body">
                    <h3>{p.nume}</h3>
                    <p>{p.descriere}</p>
                    <div className="ml-card-footer">
                      <span className="ml-pret">{p.pret} RON</span>
                      <button className="ml-btn-adauga">Adaugă la comandă</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="ml-sectiune ml-deserturi">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Finalul mesei</div>
            <h2>Deserturi</h2>
          </div>
          {loadingPreparate ? (
            <div className="ml-loading">Se încarcă...</div>
          ) : (
            <div className="ml-grid">
              {deserturi.map(p => (
                <div key={p.id} className="ml-card ml-card-desert">
                  {p.imagine && (
                    <div className="ml-card-img">
                      <img src={p.imagine} alt={p.nume} />
                    </div>
                  )}
                  <div className="ml-card-body">
                    <h3>{p.nume}</h3>
                    <p>{p.descriere}</p>
                    <div className="ml-card-footer">
                      <span className="ml-pret">{p.pret} RON</span>
                      <button className="ml-btn-adauga">Adaugă la comandă</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="ml-sectiune ml-bauturi">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Selecția barului</div>
            <h2>Băuturi</h2>
          </div>
          <div className="ml-bauturi-tabs">
            {SUBCATEGORII_BAUTURI.map(cat => (
              <button
                key={cat}
                className={`ml-tab ${subcatBautura === cat ? 'activ' : ''}`}
                onClick={() => setSubcatBautura(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {loadingBauturi ? (
            <div className="ml-loading">Se încarcă...</div>
          ) : (
            <div className="ml-grid ml-grid-bauturi">
              {bauturi.map(b => (
                <div key={b.id} className="ml-card ml-card-bautura">
                  {b.imagine && (
                    <div className="ml-card-img">
                      <img src={`/images/meniu/${b.imagine}`} alt={b.nume} />
                    </div>
                  )}
                  <div className="ml-card-body">
                    <h3>{b.nume}</h3>
                    <p>{b.descriere}</p>
                    <div className="ml-card-footer">
                      <span className="ml-pret">{b.pret} RON</span>
                      <button className="ml-btn-adauga">Adaugă la comandă</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default MeniulLunii
