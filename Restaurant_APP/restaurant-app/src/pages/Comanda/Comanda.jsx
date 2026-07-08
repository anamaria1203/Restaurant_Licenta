import './Comanda.css'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getMeniu, areRezervareConfirmata } from '../../services/api'

const CATEGORII = ['Aperitive', 'Supe', 'Carne', 'Pește', 'Paste & Risotto', 'Deserturi', 'Bauturi']
const SUBCATEGORII_BAUTURI = ['Vinuri', 'Whisky', 'Rom', 'Cocktailuri', 'Beri', 'Sucuri', 'Ceaiuri']
const CATEGORII_ICONS = {
  'Aperitive': '🥗', 'Supe': '🍜', 'Carne': '🥩', 'Pește': '🐟',
  'Paste & Risotto': '🍝', 'Deserturi': '🍰', 'Bauturi': '🍷'
}

const GatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <h2 className="gate-title">Ai cont pentru a comanda?</h2>
      <p className="gate-subtitle">
        Autentifică-te sau creează un cont gratuit pentru a plasa o comandă
      </p>
      <div className="gate-butoane">
        <a href="/login?mod=login" className="gate-btn gate-btn-primary">Da, am cont → Conectează-te</a>
        <a href="/login?mod=signup" className="gate-btn gate-btn-secondary">Nu am cont → Înregistrează-te gratuit</a>
      </div>
      <div className="gate-back"><a href="/">← Înapoi la pagina principală</a></div>
    </div>
  </div>
)

const RezervareGatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <h2 className="gate-title">Este necesară o rezervare confirmată</h2>
      <p className="gate-subtitle">
        Pentru a plasa o comandă trebuie să ai o rezervare confirmată la restaurant.
      </p>
      <div className="gate-butoane">
        <a href="/rezervare" className="gate-btn gate-btn-primary">Fă o rezervare</a>
        <a href="/rezervarile-mele" className="gate-btn gate-btn-secondary">Rezervările mele</a>
      </div>
      <div className="gate-back"><a href="/">← Înapoi la pagina principală</a></div>
    </div>
  </div>
)

const AsteptareGatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <div className="gate-asteptare-icon">⏳</div>
      <h2 className="gate-title">Rezervarea ta este în așteptare</h2>
      <p className="gate-subtitle">
        Rezervarea ta a fost înregistrată și urmează să fie confirmată de echipa noastră.
        Vei putea comanda imediat ce rezervarea este confirmată.
      </p>
      <div className="gate-butoane">
        <a href="/rezervarile-mele" className="gate-btn gate-btn-primary">Vezi rezervarea mea</a>
        <a href="/" className="gate-btn gate-btn-secondary">Înapoi acasă</a>
      </div>
    </div>
  </div>
)

const Comanda = () => {
  const userLogat = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  }, [])

  const [preparate, setPreparate] = useState([])
  const [loading, setLoading] = useState(true)
  const [categorieActiva, setCategorieActiva] = useState('Aperitive')
  const [subcategorieActiva, setSubcategorieActiva] = useState('Vinuri')
  const [rezervareOk, setRezervareOk] = useState(null)
  const [asteptare, setAsteptare] = useState(false)
  const [loadingRezervare, setLoadingRezervare] = useState(true)
  const [adaugat, setAdaugat] = useState(null)

  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') {
      setLoadingRezervare(false)
      return
    }
    areRezervareConfirmata()
      .then(data => {
        setRezervareOk(data.areRezervare)
        setAsteptare(data.areRezervareInAsteptare)
      })
      .catch(() => setRezervareOk(false))
      .finally(() => setLoadingRezervare(false))
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') return
    if (!rezervareOk) return
    fetchPreparate()
  }, [categorieActiva, subcategorieActiva, rezervareOk])

  const fetchPreparate = async () => {
    setLoading(true)
    try {
      const subcategorie = categorieActiva === 'Bauturi' ? subcategorieActiva : null
      const data = await getMeniu(categorieActiva, subcategorie)
      setPreparate(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const adaugaInCos = (preparat) => {
    const cosKey = `cos_${userLogat.id}`
    const cos = (() => { try { return JSON.parse(localStorage.getItem(cosKey)) || [] } catch { return [] } })()
    const existent = cos.find(i => i.preparatId === preparat.id)
    const nouCos = existent
      ? cos.map(i => i.preparatId === preparat.id ? { ...i, cantitate: i.cantitate + 1 } : i)
      : [...cos, { preparatId: preparat.id, numeSnapshot: preparat.name, pretSnapshot: preparat.price, cantitate: 1 }]
    localStorage.setItem(cosKey, JSON.stringify(nouCos))
    window.dispatchEvent(new Event('cos-update'))
    setAdaugat(preparat.id)
    setTimeout(() => setAdaugat(null), 1500)
  }

  if (!userLogat || userLogat.tip !== 'client') return <GatePage />
  if (loadingRezervare) return (
    <div className="comanda-page">
      <Navbar />
      <div className="comanda-loading-rezervare">
        <div className="loading-dots"><span /><span /><span /></div>
        <p>Se verifică rezervarea...</p>
      </div>
    </div>
  )
  if (!rezervareOk) return asteptare ? <AsteptareGatePage /> : <RezervareGatePage />

  return (
    <div className="comanda-page">
      <Navbar />

      <div className="comanda-hero">
        <div className="comanda-hero-glow" />
        <div className="comanda-hero-content">
          <div className="comanda-tag">Villa Ana Ristorante</div>
          <h1>Comandă Online</h1>
          <p>Alege preparatele preferate și adaugă-le în coș</p>
          <div className="comanda-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="comanda-browse">
        <div className="categorii-bar">
          {CATEGORII.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${categorieActiva === cat ? 'activ' : ''}`}
              onClick={() => {
                setCategorieActiva(cat)
                if (cat === 'Bauturi') setSubcategorieActiva('Vinuri')
              }}
            >
              <span className="cat-icon">{CATEGORII_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {categorieActiva === 'Bauturi' && (
          <div className="subcategorii-bar">
            {SUBCATEGORII_BAUTURI.map(sub => (
              <button
                key={sub}
                className={`subcat-btn ${subcategorieActiva === sub ? 'activ' : ''}`}
                onClick={() => setSubcategorieActiva(sub)}
              >{sub}</button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="meniu-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : (
          <div className="comanda-preparate-grid">
            {preparate.length === 0 ? (
              <div className="meniu-gol">Niciun preparat disponibil.</div>
            ) : preparate.map(p => (
              <div key={p.id} className={`comanda-card ${adaugat === p.id ? 'in-cos' : ''}`}>
                <div className="comanda-card-img">
                  {p.image ? (
                    <img
                      src={`/images/meniu/${p.image}`}
                      alt={p.nume}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="comanda-card-img-placeholder">🍽</div>
                  )}
                </div>
                <div className="comanda-card-info">
                  <h3>{p.nume}</h3>
                  <p>{p.description}</p>
                  <div className="comanda-card-footer">
                    <span className="comanda-card-pret">{p.price} RON</span>
                    <button
                      className={`btn-adauga-cos ${adaugat === p.id ? 'adaugat' : ''}`}
                      onClick={() => adaugaInCos(p)}
                    >
                      {adaugat === p.id ? '✓ Adăugat' : '+ Adaugă'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Comanda
