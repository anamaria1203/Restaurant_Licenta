import './AdminMeniu.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLunaActiva, setLunaActiva as apiSetLunaActiva, getPreparateLunare, getMeniu, adaugaPreparatLunar, editeazaPreparatLunar, stergePreparatLunar } from '../../../services/api'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'

const TARI_LIST = [
  { slug: 'spaniola',      flag: '🇪🇸', label: 'Spaniolă',      culoare: '#4a1a0a', titlu: 'Luna Spaniolă',      descriere: 'Pasiunea și vivacitatea Spaniei în fiecare farfurie.' },
  { slug: 'turceasca',     flag: '🇹🇷', label: 'Turcească',     culoare: '#3a1a0a', titlu: 'Luna Turcească',     descriere: 'Bogăția aromelor Orientului Mijlociu.' },
  { slug: 'moldoveneasca', flag: '🇲🇩', label: 'Moldovenească', culoare: '#1a3a1a', titlu: 'Luna Moldovenească', descriere: 'Căldura și simplitatea bucătăriei moldovenești.' },
  { slug: 'japoneza',      flag: '🇯🇵', label: 'Japoneză',      culoare: '#2a1a1a', titlu: 'Luna Japoneză',      descriere: 'Precizia și minimalismul bucătăriei japoneze.' },
  { slug: 'norvegiana',    flag: '🇳🇴', label: 'Norvegiană',    culoare: '#0d1a2a', titlu: 'Luna Norvegiană',    descriere: 'Puritatea și prospețimea bucătăriei nordice.' },
]

const SUBCATEGORII_BAUTURI = ['Vinuri', 'Whisky', 'Rom', 'Cocktailuri', 'Beri', 'Sucuri', 'Ceaiuri']

const MODAL_GOL = { nume: '', descriere: '', pret: '', imagine: '', este_desert: false }

const AdminMeniu = () => {
  const [lunaActiva, setLunaActiva]       = useState('spaniola')
  const [taraSelectata, setTaraSelectata] = useState(null)
  const [preparate, setPreparate]         = useState([])
  const [deserturi, setDeserturi]         = useState([])
  const [bauturi, setBauturi]             = useState([])
  const [subcatBautura, setSubcatBautura] = useState('Vinuri')
  const [loadingActivare, setLoadingActivare] = useState(false)
  const [loadingPreparate, setLoadingPreparate] = useState(false)
  const [showModal, setShowModal]         = useState(false)
  const [modalDate, setModalDate]         = useState(MODAL_GOL)
  const [editId, setEditId]               = useState(null)
  const [showConfirmStergere, setShowConfirmStergere] = useState(false)
  const [idDeSters, setIdDeSters]         = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    getLunaActiva()
      .then(data => setLunaActiva(data.tara))
      .catch(() => {})
  }, [navigate])

  useEffect(() => {
    if (!taraSelectata) return
    setLoadingPreparate(true)
    getPreparateLunare(taraSelectata)
      .then(data => {
        const lista = Array.isArray(data) ? data : []
        setPreparate(lista.filter(p => !p.este_desert))
        setDeserturi(lista.filter(p => p.este_desert))
      })
      .catch(() => { setPreparate([]); setDeserturi([]) })
      .finally(() => setLoadingPreparate(false))
  }, [taraSelectata])

  useEffect(() => {
    getMeniu('Bauturi', subcatBautura)
      .then(data => setBauturi(Array.isArray(data) ? data : []))
      .catch(() => setBauturi([]))
  }, [subcatBautura])

  const handleActivare = async (slug) => {
    setLoadingActivare(true)
    try {
      await apiSetLunaActiva(slug)
      setLunaActiva(slug)
    } catch (err) { console.error(err) }
    finally { setLoadingActivare(false) }
  }

  const reincarcaPreparate = () => {
    if (!taraSelectata) return
    getPreparateLunare(taraSelectata)
      .then(data => {
        const lista = Array.isArray(data) ? data : []
        setPreparate(lista.filter(p => !p.este_desert))
        setDeserturi(lista.filter(p => p.este_desert))
      })
      .catch(() => {})
  }

  const deschideAdauga = (esteDesert) => {
    setModalDate({ ...MODAL_GOL, este_desert: esteDesert })
    setEditId(null)
    setShowModal(true)
  }

  const deschideEditare = (p) => {
    setModalDate({ nume: p.nume, descriere: p.descriere || '', pret: p.pret, imagine: p.imagine || '', este_desert: p.este_desert })
    setEditId(p.id)
    setShowModal(true)
  }

  const salveaza = async () => {
    if (!modalDate.nume || !modalDate.pret) return
    const body = { ...modalDate, pret: parseFloat(modalDate.pret), tara: taraSelectata }
    try {
      if (editId) {
        await editeazaPreparatLunar(editId, body)
      } else {
        await adaugaPreparatLunar(body)
      }
      setShowModal(false)
      reincarcaPreparate()
    } catch (err) { console.error(err) }
  }

  const cerConfirmareStergere = (id) => {
    setIdDeSters(id)
    setShowConfirmStergere(true)
  }

  const sterge = async () => {
    try {
      await stergePreparatLunar(idDeSters)
      setShowConfirmStergere(false)
      setIdDeSters(null)
      reincarcaPreparate()
    } catch (err) { console.error(err) }
  }

  const taraInfo = TARI_LIST.find(t => t.slug === taraSelectata)

  return (
    <div className="am-page">
      <AdminNavbar title="Meniu Țări" />

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
              <div className="am-meniu-header" style={{ background: taraInfo?.culoare }}>
                <div className="am-meniu-header-overlay" />
                <div className="am-meniu-header-content">
                  <div className="am-meniu-tag">Meniul Lunii · Martie 2026</div>
                  <h2>{taraInfo?.titlu}</h2>
                  <p>{taraInfo?.descriere}</p>
                </div>
              </div>

              <div className="am-meniu-body">

                {/* Preparate */}
                <div className="am-sectiune">
                  <div className="am-sectiune-header">
                    <div>
                      <span className="am-sectiune-label">Preparate principale</span>
                      <h3>Feluri de mâncare</h3>
                    </div>
                    <button className="am-btn-adauga-preparat" onClick={() => deschideAdauga(false)}>+ Adaugă preparat</button>
                  </div>
                  {loadingPreparate ? <div className="am-loading">Se încarcă...</div> : (
                    <div className="am-grid">
                      {preparate.map(p => (
                        <div key={p.id} className="am-card">
                          {p.imagine && <div className="am-card-img"><img src={p.imagine} alt={p.nume} /></div>}
                          <div className="am-card-body">
                            <h4>{p.nume}</h4>
                            <p>{p.descriere}</p>
                            <span className="am-pret">{p.pret} RON</span>
                            <div className="am-card-actiuni">
                              <button className="am-btn-edit" onClick={() => deschideEditare(p)}>Editează</button>
                              <button className="am-btn-sterge" onClick={() => cerConfirmareStergere(p.id)}>Șterge</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Deserturi */}
                <div className="am-sectiune am-deserturi">
                  <div className="am-sectiune-header">
                    <div>
                      <span className="am-sectiune-label">Finalul mesei</span>
                      <h3>Deserturi</h3>
                    </div>
                    <button className="am-btn-adauga-preparat" onClick={() => deschideAdauga(true)}>+ Adaugă desert</button>
                  </div>
                  {loadingPreparate ? <div className="am-loading">Se încarcă...</div> : (
                    <div className="am-grid">
                      {deserturi.map(p => (
                        <div key={p.id} className="am-card am-card-desert">
                          {p.imagine && <div className="am-card-img"><img src={p.imagine} alt={p.nume} /></div>}
                          <div className="am-card-body">
                            <h4>{p.nume}</h4>
                            <p>{p.descriere}</p>
                            <span className="am-pret">{p.pret} RON</span>
                            <div className="am-card-actiuni">
                              <button className="am-btn-edit" onClick={() => deschideEditare(p)}>Editează</button>
                              <button className="am-btn-sterge" onClick={() => cerConfirmareStergere(p.id)}>Șterge</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Băuturi */}
                <div className="am-sectiune am-bauturi">
                  <div className="am-sectiune-header">
                    <div>
                      <span className="am-sectiune-label">Selecția barului</span>
                      <h3>Băuturi</h3>
                    </div>
                  </div>
                  <div className="am-bauturi-tabs">
                    {SUBCATEGORII_BAUTURI.map(cat => (
                      <button key={cat} className={`am-tab ${subcatBautura === cat ? 'activ' : ''}`} onClick={() => setSubcatBautura(cat)}>{cat}</button>
                    ))}
                  </div>
                  <div className="am-grid">
                    {bauturi.map(b => (
                      <div key={b.id} className="am-card am-card-bautura">
                        {b.imagine && <div className="am-card-img"><img src={`/images/meniu/${b.imagine}`} alt={b.nume} /></div>}
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

      {/* ── Modal adaugă / editează ── */}
      {showModal && (
        <div className="am-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="am-modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Editează preparat' : modalDate.este_desert ? 'Adaugă desert' : 'Adaugă preparat'}</h3>
            <label>Nume *
              <input value={modalDate.nume} onChange={e => setModalDate(d => ({ ...d, nume: e.target.value }))} placeholder="Ex: Paella Valenciana" />
            </label>
            <label>Descriere
              <textarea value={modalDate.descriere} onChange={e => setModalDate(d => ({ ...d, descriere: e.target.value }))} rows={3} placeholder="Descriere scurtă..." />
            </label>
            <label>Preț (RON) *
              <input type="number" value={modalDate.pret} onChange={e => setModalDate(d => ({ ...d, pret: e.target.value }))} placeholder="85" />
            </label>
            <label>Imagine (cale)
              <input value={modalDate.imagine} onChange={e => setModalDate(d => ({ ...d, imagine: e.target.value }))} placeholder="/images/meniu-lunii/imagine.jpg" />
            </label>
            <div className="am-modal-actiuni">
              <button className="am-btn-cancel" onClick={() => setShowModal(false)}>Anulează</button>
              <button className="am-btn-salveaza" onClick={salveaza}>Salvează</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal confirmare ștergere ── */}
      {showConfirmStergere && (
        <div className="am-modal-overlay" onClick={() => setShowConfirmStergere(false)}>
          <div className="am-modal am-modal-mic" onClick={e => e.stopPropagation()}>
            <h3>Confirmare ștergere</h3>
            <p>Ești sigur că vrei să ștergi acest preparat? Acțiunea este ireversibilă.</p>
            <div className="am-modal-actiuni">
              <button className="am-btn-cancel" onClick={() => setShowConfirmStergere(false)}>Anulează</button>
              <button className="am-btn-sterge-confirm" onClick={sterge}>Șterge</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminMeniu
