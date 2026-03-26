import './AdminMeniu.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TARI, BAUTURI } from '../MeniulLunii/MeniulLunii'

const TARI_LIST = [
  { slug: 'spaniola',      flag: '🇪🇸', label: 'Spaniolă',      poze: true  },
  { slug: 'turceasca',     flag: '🇹🇷', label: 'Turcească',     poze: true  },
  { slug: 'moldoveneasca', flag: '🇲🇩', label: 'Moldovenească', poze: false },
  { slug: 'japoneza',      flag: '🇯🇵', label: 'Japoneză',      poze: false },
  { slug: 'norvegiana',    flag: '🇳🇴', label: 'Norvegiană',    poze: false },
]

const AdminMeniu = () => {
  const [lunaActiva, setLunaActiva] = useState('spaniola')
  const [taraSelectata, setTaraSelectata] = useState(null)
  const [subcatBautura, setSubcatBautura] = useState('Vinuri')
  const [loadingActivare, setLoadingActivare] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    fetch('http://localhost:8080/luna/activa')
      .then(res => res.json())
      .then(data => setLunaActiva(data.tara))
      .catch(() => {})
  }, [navigate])

  const handleActivare = async (slug) => {
    setLoadingActivare(true)
    try {
      await fetch('http://localhost:8080/luna/activa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tara: slug })
      })
      setLunaActiva(slug)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingActivare(false)
    }
  }

  const taraData = taraSelectata ? (TARI[taraSelectata] || null) : null
  const preparate = taraData ? taraData.preparate.filter(p => !p.este_desert) : []
  const deserturi  = taraData ? taraData.preparate.filter(p => p.este_desert)  : []

  return (
    <div className="am-page">
      <div className="am-navbar">
        <div className="am-navbar-logo">Villa Ana Ristorante</div>
        <div className="am-navbar-title">Gestionare Meniu Luni</div>
        <button className="am-back-btn" onClick={() => navigate('/admin-dashboard')}>
          ← Dashboard
        </button>
      </div>

      <div className="am-layout">

        {/* ── Sidebar stânga ── */}
        <div className="am-sidebar">
          <div className="am-sidebar-header">
            <p className="am-sidebar-label">Țările din meniu</p>
          </div>
          {TARI_LIST.map(({ slug, flag, label }) => (
            <div key={slug} className={`am-tara-item ${taraSelectata === slug ? 'am-tara-selected' : ''}`}>
              <div className="am-tara-top">
                <span className="am-tara-flag">{flag}</span>
                <div className="am-tara-info">
                  <span className="am-tara-label">{label}</span>
                  {lunaActiva === slug && <span className="am-activa-badge">Activă</span>}
                </div>
              </div>
              <div className="am-tara-butoane">
                <button
                  className="am-btn-activeaza"
                  onClick={() => handleActivare(slug)}
                  disabled={lunaActiva === slug || loadingActivare}
                >
                  {lunaActiva === slug ? 'Activă' : 'Activează'}
                </button>
                <button
                  className={`am-btn-vezi ${taraSelectata === slug ? 'am-btn-selectat' : ''}`}
                  onClick={() => { setTaraSelectata(slug); setSubcatBautura('Vinuri') }}
                >
                  Vezi meniu
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Conținut dreapta ── */}
        <div className="am-content">
          {!taraSelectata ? (
            <div className="am-placeholder">
              <div className="am-placeholder-icon">🍽</div>
              <p>Selectează o țară din stânga pentru a vedea meniul</p>
            </div>
          ) : (
            <div className="am-meniu">
              <div className="am-meniu-header" style={{ background: taraData.culoare }}>
                <div className="am-meniu-header-overlay" />
                <div className="am-meniu-header-content">
                  <div className="am-meniu-tag">Meniul Lunii · Martie 2026</div>
                  <h2>{taraData.titlu}</h2>
                  <p>{taraData.descriere}</p>
                </div>
              </div>

              <div className="am-meniu-body">

                <div className="am-sectiune">
                  <div className="am-sectiune-header">
                    <span className="am-sectiune-label">Preparate principale</span>
                    <h3>Feluri de mâncare</h3>
                  </div>
                  <div className="am-grid">
                    {preparate.map((p, i) => (
                      <div key={i} className="am-card">
                        {p.imagine && (
                          <div className="am-card-img">
                            <img src={p.imagine} alt={p.nume} />
                          </div>
                        )}
                        <div className="am-card-body">
                          <h4>{p.nume}</h4>
                          <p>{p.descriere}</p>
                          <span className="am-pret">{p.pret} RON</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="am-sectiune am-deserturi">
                  <div className="am-sectiune-header">
                    <span className="am-sectiune-label">Finalul mesei</span>
                    <h3>Deserturi</h3>
                  </div>
                  <div className="am-grid">
                    {deserturi.map((p, i) => (
                      <div key={i} className="am-card am-card-desert">
                        {p.imagine && (
                          <div className="am-card-img">
                            <img src={p.imagine} alt={p.nume} />
                          </div>
                        )}
                        <div className="am-card-body">
                          <h4>{p.nume}</h4>
                          <p>{p.descriere}</p>
                          <span className="am-pret">{p.pret} RON</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="am-sectiune am-bauturi">
                  <div className="am-sectiune-header">
                    <span className="am-sectiune-label">Selecția barului</span>
                    <h3>Băuturi</h3>
                  </div>
                  <div className="am-bauturi-tabs">
                    {Object.keys(BAUTURI).map(cat => (
                      <button
                        key={cat}
                        className={`am-tab ${subcatBautura === cat ? 'activ' : ''}`}
                        onClick={() => setSubcatBautura(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="am-grid">
                    {BAUTURI[subcatBautura].map((b, i) => (
                      <div key={i} className="am-card am-card-bautura">
                        {b.imagine && (
                          <div className="am-card-img">
                            <img src={b.imagine} alt={b.nume} />
                          </div>
                        )}
                        <div className="am-card-body">
                          <h4>{b.nume}</h4>
                          <p>{b.descriere}</p>
                          <span className="am-pret">{b.pret} RON</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AdminMeniu
