import './Meniu.css'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getMeniu } from '../../services/api'

const CATEGORII = ['Aperitive', 'Supe', 'Carne', 'Pește', 'Paste & Risotto', 'Deserturi', 'Bauturi']
const SUBCATEGORII_BAUTURI = ['Vinuri', 'Whisky', 'Rom', 'Cocktailuri', 'Beri', 'Sucuri', 'Ceaiuri']

const CATEGORII_ICONS = {
  'Aperitive': '🥗',
  'Supe': '🍜',
  'Carne': '🥩',
  'Pește': '🐟',
  'Paste & Risotto': '🍝',
  'Deserturi': '🍰',
  'Bauturi': '🍷'
}

const BADGE_CULORI = {
  "Chef's Choice": 'badge-chef',
  'Signature': 'badge-signature',
  'Sezonier': 'badge-sezonier'
}

const Meniu = () => {
  const userLogat = (() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })()

  const [preparate, setPreparate] = useState([])
  const [loading, setLoading] = useState(true)
  const [categorieActiva, setCategorieActiva] = useState('Aperitive')
  const [subcategorieActiva, setSubcategorieActiva] = useState('Vinuri')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortPret, setSortPret] = useState(null)
  const [showGate, setShowGate] = useState(false)
  const [adaugat, setAdaugat] = useState(null)

  const handleAdauga = (preparat) => {
    if (!userLogat || userLogat.tip !== 'client') {
      setShowGate(true)
      return
    }
    const cos = (() => { try { return JSON.parse(localStorage.getItem('cos')) || [] } catch { return [] } })()
    const existent = cos.find(i => i.preparatId === preparat.id)
    const nouCos = existent
      ? cos.map(i => i.preparatId === preparat.id ? { ...i, cantitate: i.cantitate + 1 } : i)
      : [...cos, { preparatId: preparat.id, numeSnapshot: preparat.nume, pretSnapshot: preparat.pret, cantitate: 1 }]
    localStorage.setItem('cos', JSON.stringify(nouCos))
    window.dispatchEvent(new Event('cos-update'))
    setAdaugat(preparat.id)
    setTimeout(() => setAdaugat(null), 1500)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPreparate()
    setSearchQuery('')
    setSortPret(null)
  }, [categorieActiva, subcategorieActiva])

  const fetchPreparate = async () => {
    setLoading(true)
    try {
      const subcategorie = categorieActiva === 'Bauturi' ? subcategorieActiva : null
      const data = await getMeniu(categorieActiva, subcategorie)
      setPreparate(data)
    } catch (err) {
      console.error('Eroare la incarcarea meniului:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorieClick = (cat) => {
    setCategorieActiva(cat)
    if (cat === 'Bauturi') setSubcategorieActiva('Vinuri')
  }

  const recomandate = useMemo(() =>
    preparate.filter(p => p.badge === "Chef's Choice").slice(0, 3),
    [preparate]
  )

  const preparateFiltrate = useMemo(() => {
    let result = preparate.filter(p =>
      p.nume.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (sortPret === 'asc') result = [...result].sort((a, b) => a.pret - b.pret)
    if (sortPret === 'desc') result = [...result].sort((a, b) => b.pret - a.pret)
    return result
  }, [preparate, searchQuery, sortPret])

  return (
    <div className="meniu-page">
      <Navbar />

      <div className="meniu-hero">
        <div className="meniu-hero-glow" />
        <div className="meniu-hero-content">
          <div className="meniu-tag">Villa Ana Ristorante</div>
          <h1>Meniul Nostru</h1>
          <p>Preparate cu ingrediente de sezon, inspirate din tradițiile italiene și mediteraneene</p>
          <div className="meniu-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="meniu-body">

        <div className="categorii-bar">
          {CATEGORII.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${categorieActiva === cat ? 'activ' : ''}`}
              onClick={() => handleCategorieClick(cat)}
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
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        <div className="filtru-bar">
          <div className="search-wrapper">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Caută în meniu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <div className="sort-btns">
            <span className="sort-label">Preț:</span>
            <button
              className={`sort-btn ${sortPret === 'asc' ? 'activ' : ''}`}
              onClick={() => setSortPret('asc')}
            >↑ Crescător</button>
            <button
              className={`sort-btn ${sortPret === 'desc' ? 'activ' : ''}`}
              onClick={() => setSortPret('desc')}
            >↓ Descrescător</button>
          </div>
          <span className="preparate-count">{preparateFiltrate.length} preparate</span>
        </div>

        {loading ? (
          <div className="meniu-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă meniul...</p>
          </div>
        ) : (
          <>
            {recomandate.length > 0 && !searchQuery && (
              <div className="recomandate-section">
                <div className="recomandate-header">
                  <span className="recomandate-star">★</span>
                  <span className="recomandate-titlu">Recomandările Bucătarului</span>
                  <span className="recomandate-star">★</span>
                </div>
                <div className="recomandate-grid">
                  {recomandate.map(p => (
                    <div key={p.id} className="recomandat-card">
                      <div className="recomandat-imagine">
                        {p.imagine ? (
                          <img src={`/images/meniu/${p.imagine}`} alt={p.nume} onError={e => { e.target.style.display = 'none' }} />
                        ) : null}
                        <div className="imagine-icon-sm">🍽</div>
                      </div>
                      <div className="recomandat-info">
                        <span className="recomandat-badge-tag">Chef's Choice</span>
                        <h4>{p.nume}</h4>
                        <p>{p.descriere}</p>
                        <div className="recomandat-footer">
                          <span className="recomandat-pret">{p.pret} RON</span>
                          <button className="btn-adauga" onClick={() => handleAdauga(p)}>
                            {adaugat === p.id ? '✓ Adăugat' : 'Adaugă'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="preparate-grid">
              {preparateFiltrate.length === 0 ? (
                <div className="meniu-gol">Niciun preparat găsit.</div>
              ) : (
                preparateFiltrate.map(p => (
                  <div key={p.id} className="preparat-card">
                    <div className="preparat-imagine-wrapper">
                      {p.imagine ? (
                        <img
                          src={`/images/meniu/${p.imagine}`}
                          alt={p.nume}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="imagine-icon">🍽</div>
                      )}
                      {p.badge && (
                        <span className={`preparat-badge ${BADGE_CULORI[p.badge] || ''}`}>
                          {p.badge}
                        </span>
                      )}
                      {p.vegan && (
                         <span className="preparat-badge badge-vegan">Vegan</span>
                      )}
                    </div>
                    <div className="preparat-info">
                      <h3>{p.nume}</h3>
                      <p className="preparat-descriere">{p.descriere}</p>
                      {p.alergeni && (
                        <p className="preparat-alergeni">
                          <span>Alergeni:</span> {p.alergeni}
                        </p>
                      )}
                      <div className="preparat-footer">
                        <span className="preparat-pret">{p.pret} RON</span>
                        <button className="btn-adauga" onClick={() => handleAdauga(p)}>
                          {adaugat === p.id ? '✓ Adăugat' : 'Adaugă la comandă'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <Footer />

      {showGate && (
        <div className="gate-modal-overlay" onClick={() => setShowGate(false)}>
          <div className="gate-modal-card" onClick={e => e.stopPropagation()}>
            <button className="gate-modal-close" onClick={() => setShowGate(false)}>✕</button>
            <h3>Ai cont la restaurant?</h3>
            <p>Este necesar un cont pentru a plasa o comandă. Conectează-te sau înregistrează-te gratuit.</p>
            <div className="gate-modal-butoane">
              <a href="/login?mod=login" className="gate-modal-btn-primary">Da, am cont → Conectează-te</a>
              <a href="/login?mod=signup" className="gate-modal-btn-secondary">Nu am cont → Înregistrează-te</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Meniu
