import './PreferinteMele.css'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getPreferinteMele } from '../../services/api'

const GatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Preferatele tale</div>
      <h2 className="gate-title">Autentifică-te pentru a vedea preferatele</h2>
      <p className="gate-subtitle">
        Conectează-te pentru a vedea preparatele pe care le-ai comandat cel mai des.
      </p>
      <div className="gate-butoane">
        <a href="/login?mod=login" className="gate-btn gate-btn-primary">Da, am cont → Conectează-te</a>
        <a href="/login?mod=signup" className="gate-btn gate-btn-secondary">Nu am cont → Înregistrează-te gratuit</a>
      </div>
      <div className="gate-back"><a href="/">← Înapoi la pagina principală</a></div>
    </div>
  </div>
)

const PreferinteMele = () => {
  const userLogat = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  }, [])

  const [preferinte, setPreferinte] = useState([])
  const [loading, setLoading] = useState(true)
  const [adaugat, setAdaugat] = useState(null)

  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') {
      setLoading(false)
      return
    }
    getPreferinteMele()
      .then(data => setPreferinte(Array.isArray(data) ? data : []))
      .catch(() => setPreferinte([]))
      .finally(() => setLoading(false))
  }, [])

  const adaugaInCos = (preparat) => {
    const cosKey = `cos_${userLogat.id}`
    const cos = (() => { try { return JSON.parse(localStorage.getItem(cosKey)) || [] } catch { return [] } })()
    const existent = cos.find(i => i.preparatId === preparat.id)
    const nouCos = existent
      ? cos.map(i => i.preparatId === preparat.id ? { ...i, cantitate: i.cantitate + 1 } : i)
      : [...cos, { preparatId: preparat.id, numeSnapshot: preparat.nume, pretSnapshot: preparat.pret, cantitate: 1 }]
    localStorage.setItem(cosKey, JSON.stringify(nouCos))
    window.dispatchEvent(new Event('cos-update'))
    setAdaugat(preparat.id)
    setTimeout(() => setAdaugat(null), 1500)
  }

  const peCategorie = useMemo(() => {
    const map = {}
    preferinte.forEach(p => {
      if (!map[p.categorie]) map[p.categorie] = []
      map[p.categorie].push(p)
    })
    return map
  }, [preferinte])

  if (!userLogat || userLogat.tip !== 'client') return <GatePage />

  return (
    <div className="preferinte-page">
      <Navbar />

      <div className="preferinte-hero">
        <div className="preferinte-hero-glow" />
        <div className="preferinte-hero-content">
          <div className="preferinte-tag">Contul meu</div>
          <h1>Preferatele Mele</h1>
          <p>Preparatele pe care le-ai comandat cel mai des</p>
          <div className="preferinte-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="preferinte-body">
        {loading ? (
          <div className="preferinte-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă preferatele...</p>
          </div>
        ) : preferinte.length === 0 ? (
          <div className="preferinte-gol">
            <div className="preferinte-gol-icon">🍽</div>
            <h3>Nu ai comenzi încă</h3>
            <p>Plasează prima ta comandă și vei vedea aici preparatele tale favorite.</p>
            <a href="/comanda" className="preferinte-btn-browse">Mergi la Comenzi</a>
          </div>
        ) : (
          Object.entries(peCategorie).map(([categorie, items]) => (
            <section key={categorie} className="preferinte-sectiune">
              <div className="preferinte-sectiune-header">
                <h2>{categorie}</h2>
              </div>
              <div className="preferinte-grid">
                {items.map(p => (
                  <div key={p.id} className="preferinte-card">
                    <div className="preferinte-card-img">
                      {p.imagine ? (
                        <img
                          src={`/images/meniu/${p.imagine}`}
                          alt={p.nume}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="preferinte-card-img-placeholder">🍽</div>
                      )}
                      <div className="preferinte-frecventa">× {p.totalComandat} comandat</div>
                    </div>
                    <div className="preferinte-card-info">
                      <h3>{p.nume}</h3>
                      <p>{p.descriere}</p>
                      <div className="preferinte-card-footer">
                        <span className="preferinte-pret">{p.pret} RON</span>
                        <button
                          className={`preferinte-btn-adauga ${adaugat === p.id ? 'adaugat' : ''}`}
                          onClick={() => adaugaInCos(p)}
                        >
                          {adaugat === p.id ? '✓ Adăugat' : '+ Adaugă'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <Footer />
    </div>
  )
}

export default PreferinteMele
