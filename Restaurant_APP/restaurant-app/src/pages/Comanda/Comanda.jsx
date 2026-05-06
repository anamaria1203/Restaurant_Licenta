import './Comanda.css'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getMeniu, creeazaComanda } from '../../services/api'

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
        <a href="/login?mod=login" className="gate-btn gate-btn-primary">
          Da, am cont → Conectează-te
        </a>
        <a href="/login?mod=signup" className="gate-btn gate-btn-secondary">
          Nu am cont → Înregistrează-te gratuit
        </a>
      </div>
      <div className="gate-back">
        <a href="/">← Înapoi la pagina principală</a>
      </div>
    </div>
  </div>
)

const SuccesPage = ({ onReset }) => (
  <div className="comanda-page">
    <Navbar />
    <div className="comanda-succes-wrap">
      <div className="comanda-succes-card">
        <div className="succes-check">✓</div>
        <h2>Comanda a fost plasată!</h2>
        <p>Îți mulțumim! Comanda ta a fost înregistrată și va fi procesată în curând.</p>
        <div className="succes-butoane">
          <a href="/comenzile-mele" className="btn-succes-primary">Vezi comenzile mele</a>
          <button className="btn-succes-secondary" onClick={onReset}>Comandă din nou</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

const Comanda = () => {
  const userLogat = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  }, [])

  const [cos, setCos] = useState([])
  const [preparate, setPreparate] = useState([])
  const [loading, setLoading] = useState(true)
  const [categorieActiva, setCategorieActiva] = useState('Aperitive')
  const [subcategorieActiva, setSubcategorieActiva] = useState('Vinuri')
  const [observatii, setObservatii] = useState('')
  const [succes, setSucces] = useState(false)
  const [loadingComanda, setLoadingComanda] = useState(false)
  const [eroare, setEroare] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') return
    fetchPreparate()
  }, [categorieActiva, subcategorieActiva])

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
    setCos(prev => {
      const existent = prev.find(i => i.preparatId === preparat.id)
      if (existent) {
        return prev.map(i =>
          i.preparatId === preparat.id ? { ...i, cantitate: i.cantitate + 1 } : i
        )
      }
      return [...prev, {
        preparatId: preparat.id,
        numeSnapshot: preparat.nume,
        pretSnapshot: preparat.pret,
        cantitate: 1
      }]
    })
  }

  const scadeCantitate = (preparatId) => {
    setCos(prev => {
      const item = prev.find(i => i.preparatId === preparatId)
      if (item.cantitate === 1) return prev.filter(i => i.preparatId !== preparatId)
      return prev.map(i =>
        i.preparatId === preparatId ? { ...i, cantitate: i.cantitate - 1 } : i
      )
    })
  }

  const stergedinCos = (preparatId) => {
    setCos(prev => prev.filter(i => i.preparatId !== preparatId))
  }

  const total = cos.reduce((sum, item) => sum + item.pretSnapshot * item.cantitate, 0)
  const nrProduse = cos.reduce((s, i) => s + i.cantitate, 0)

  const handlePlaseazaComanda = async () => {
    if (cos.length === 0) return
    setLoadingComanda(true)
    setEroare('')
    try {
      const response = await creeazaComanda(cos, observatii)
      const data = await response.json()
      if (!response.ok) {
        setEroare(data.error || 'Eroare la plasarea comenzii')
      } else {
        setSucces(true)
        setCos([])
        setObservatii('')
      }
    } catch {
      setEroare('Eroare de conexiune cu serverul')
    } finally {
      setLoadingComanda(false)
    }
  }

  if (!userLogat || userLogat.tip !== 'client') return <GatePage />
  if (succes) return <SuccesPage onReset={() => setSucces(false)} />

  return (
    <div className="comanda-page">
      <Navbar />

      <div className="comanda-hero">
        <div className="comanda-hero-glow" />
        <div className="comanda-hero-content">
          <div className="comanda-tag">Villa Ana Ristorante</div>
          <h1>Comandă Online</h1>
          <p>Alege preparatele preferate și plasează comanda direct</p>
          <div className="comanda-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="comanda-layout">
        <div className="comanda-meniu">
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
              ) : preparate.map(p => {
                const inCos = cos.find(i => i.preparatId === p.id)
                return (
                  <div key={p.id} className={`comanda-card ${inCos ? 'in-cos' : ''}`}>
                    <div className="comanda-card-img">
                      {p.imagine ? (
                        <img
                          src={`/images/meniu/${p.imagine}`}
                          alt={p.nume}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="comanda-card-img-placeholder">🍽</div>
                      )}
                      {inCos && <span className="cos-badge">× {inCos.cantitate}</span>}
                    </div>
                    <div className="comanda-card-info">
                      <h3>{p.nume}</h3>
                      <p>{p.descriere}</p>
                      <div className="comanda-card-footer">
                        <span className="comanda-card-pret">{p.pret} RON</span>
                        <button
                          className="btn-adauga-cos"
                          onClick={() => adaugaInCos(p)}
                        >+ Adaugă</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="comanda-cos">
          <div className="cos-header">
            <h3>Coșul tău</h3>
            {nrProduse > 0 && (
              <span className="cos-count">{nrProduse} {nrProduse === 1 ? 'produs' : 'produse'}</span>
            )}
          </div>

          {cos.length === 0 ? (
            <div className="cos-gol">
              <div className="cos-gol-icon">🛒</div>
              <p>Coșul este gol</p>
              <span>Adaugă preparate din meniu</span>
            </div>
          ) : (
            <>
              <div className="cos-items">
                {cos.map(item => (
                  <div key={item.preparatId} className="cos-item">
                    <div className="cos-item-info">
                      <div className="cos-item-nume">{item.numeSnapshot}</div>
                      <div className="cos-item-pret">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</div>
                    </div>
                    <div className="cos-item-controls">
                      <button className="ctrl-btn" onClick={() => scadeCantitate(item.preparatId)}>−</button>
                      <span className="ctrl-nr">{item.cantitate}</span>
                      <button className="ctrl-btn" onClick={() => adaugaInCos({ id: item.preparatId, nume: item.numeSnapshot, pret: item.pretSnapshot })}>+</button>
                      <button className="ctrl-btn sterge" onClick={() => stergedinCos(item.preparatId)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cos-observatii">
                <label>Observații (opțional)</label>
                <textarea
                  placeholder="Alergii, preferințe, mențiuni speciale..."
                  value={observatii}
                  onChange={e => setObservatii(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="cos-total">
                <span>Total estimat</span>
                <span className="total-suma">{total.toFixed(2)} RON</span>
              </div>

              {eroare && <div className="cos-eroare">⚠ {eroare}</div>}

              <button
                className="btn-plaseaza"
                onClick={handlePlaseazaComanda}
                disabled={loadingComanda}
              >
                {loadingComanda ? 'Se procesează...' : 'Plasează comanda'}
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Comanda
