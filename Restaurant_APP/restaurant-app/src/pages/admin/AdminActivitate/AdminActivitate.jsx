import './AdminActivitate.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getComenziAdmin, getRezervariAdmin, updateStatusRezervare, updateStatusComanda } from '../../../services/api'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'

const STATUS_COM = {
  in_asteptare: { label: 'În așteptare', cls: 'act-status-asteptare' },
  confirmata:   { label: 'Confirmată',   cls: 'act-status-confirmata' },
  in_preparare: { label: 'În preparare', cls: 'act-status-preparare' },
  livrata:      { label: 'Livrată',      cls: 'act-status-livrata' },
  anulata:      { label: 'Anulată',      cls: 'act-status-anulata' }
}

const ZONA_LABEL = {
  retras:    'Colț Retras',
  fereastra: 'Lângă Fereastră',
  terasa:    'Terasă',
  central:   'Central',
  vip:       'Salon VIP'
}

const formatData = (data) =>
  new Date(data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })

const formatDataScurt = (data) =>
  new Date(data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })

const AdminActivitate = () => {
  const navigate = useNavigate()
  const [toate, setToate] = useState([])
  const [loading, setLoading] = useState(true)
  const [procesand, setProcesand] = useState(null)
  const [confirmareAnulare, setConfirmareAnulare] = useState(null)
  const [showAnulateManager, setShowAnulateManager] = useState(false)
  const [showAnulateClient, setShowAnulateClient] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    fetchDate()
  }, [navigate])

  const fetchDate = async () => {
    setLoading(true)
    try {
      const [rez, com] = await Promise.all([getRezervariAdmin(), getComenziAdmin()])
      const rezervariCuComanda = rez.map(r => ({
        ...r,
        comanda: com.find(c => c.rezervareId === r.id) || null
      }))
      setToate(rezervariCuComanda)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRezervare = async (id, status) => {
    setProcesand(`rez-${id}`)
    try {
      const res = await updateStatusRezervare(id, status)
      if (res.ok) {
        const updated = await res.json()
        setToate(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r))
      }
    } finally { setProcesand(null) }
  }

  const handleComanda = async (id, status) => {
    setProcesand(`com-${id}`)
    try {
      const res = await updateStatusComanda(id, status)
      if (res.ok) {
        setToate(prev => prev.map(r =>
          r.comanda?.id === id ? { ...r, comanda: { ...r.comanda, status } } : r
        ))
      }
    } finally { setProcesand(null) }
  }

  const inAsteptare = toate.filter(r => r.status === 'in_asteptare')
  const confirmate = toate
    .filter(r => r.status === 'confirmata')
    .sort((a, b) => {
      if (a.data !== b.data) return a.data.localeCompare(b.data)
      return a.ora.localeCompare(b.ora)
    })
  const anulateManager = toate.filter(r => r.status === 'anulata' && r.anulataDe !== 'client')
  const anulateClient  = toate.filter(r => r.status === 'anulata' && r.anulataDe === 'client')

  const RandComanda = ({ comanda }) => {
    if (!comanda) return <div className="act-fara-comanda">Nicio pre-comandă asociată</div>
    return (
      <div className="act-precomanda">
        <div className="act-precomanda-header">
          <span className="act-precomanda-label">Comandă pre-comandată</span>
          <div className="act-precomanda-dreapta">
            <span className={`act-status ${STATUS_COM[comanda.status]?.cls}`}>
              {STATUS_COM[comanda.status]?.label}
            </span>
            <div className="act-butoane">
              {comanda.status === 'in_asteptare' && (
                <>
                  <button className="act-btn-confirma" onClick={() => handleComanda(comanda.id, 'confirmata')} disabled={procesand === `com-${comanda.id}`}>Confirmă</button>
                  <button className="act-btn-respinge" onClick={() => handleComanda(comanda.id, 'anulata')} disabled={procesand === `com-${comanda.id}`}>Respinge</button>
                </>
              )}
              {comanda.status === 'confirmata' && (
                <button className="act-btn-preparare" onClick={() => handleComanda(comanda.id, 'in_preparare')} disabled={procesand === `com-${comanda.id}`}>În preparare</button>
              )}
              {comanda.status === 'in_preparare' && (
                <button className="act-btn-livrata" onClick={() => handleComanda(comanda.id, 'livrata')} disabled={procesand === `com-${comanda.id}`}>Livrată</button>
              )}
            </div>
          </div>
        </div>
        <div className="act-precomanda-items">
          {comanda.ComandaItems?.map(item => (
            <div key={item.id} className="act-precomanda-item">
              <span className="act-ci-nume">{item.numeSnapshot}</span>
              <span className="act-ci-cant">× {item.cantitate}</span>
              <span className="act-ci-pret">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</span>
            </div>
          ))}
        </div>
        <div className="act-precomanda-total">
          Total: {Number(comanda.total).toFixed(2)} RON
        </div>
      </div>
    )
  }

  return (
    <div className="act-page">
      <AdminNavbar title="Comenzi &amp; Rezervări" />

      <div className="act-content">
        <div className="act-header">
          <h1>Activitate Restaurant</h1>
          <p>Rezervări și comenzi</p>
        </div>

        {loading ? (
          <div className="act-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : (
          <>
            {/* ─── BANNERS REZERVĂRI NOI ─── */}
            {inAsteptare.length > 0 && (
              <div className="act-banners-wrapper">
                {inAsteptare.map(r => (
                  <div key={r.id} className="act-banner-noua">
                    <div className="act-banner-titlu">
                      <span className="act-banner-tag">Rezervare nouă</span>
                      <span className="act-banner-nr">#{r.id}</span>
                      <span className="act-banner-client">{r.user?.nume}</span>
                      <span className="act-banner-email">{r.user?.email}</span>
                    </div>

                    <div className="act-rez-detalii">
                      <span>{formatData(r.data)}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{r.ora}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{ZONA_LABEL[r.zona]}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{r.nrPersoane} pers.</span>
                      {r.ocazie && <><span className="act-rez-sep">·</span><span className="act-ocazie">{r.ocazie}</span></>}
                    </div>

                    {r.observatii && (
                      <div className="act-obs">Observații: {r.observatii}</div>
                    )}

                    <RandComanda comanda={r.comanda} />

                    <div className="act-banner-butoane">
                      {confirmareAnulare === r.id ? (
                        <div className="act-confirmare-inline">
                          <span>Sigur respingi?</span>
                          <button className="act-btn-respinge" onClick={() => { handleRezervare(r.id, 'anulata'); setConfirmareAnulare(null) }} disabled={procesand === `rez-${r.id}`}>Da</button>
                          <button className="act-btn-anulare-nu" onClick={() => setConfirmareAnulare(null)}>Nu</button>
                        </div>
                      ) : (
                        <>
                          <button className="act-btn-confirma act-btn-lg" onClick={() => handleRezervare(r.id, 'confirmata')} disabled={procesand === `rez-${r.id}`}>
                            ✓ Confirmă
                          </button>
                          <button className="act-btn-respinge act-btn-lg" onClick={() => setConfirmareAnulare(r.id)} disabled={procesand === `rez-${r.id}`}>
                            ✗ Respinge
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── LAYOUT: SIDEBAR + MAIN ─── */}
            <div className="act-layout">

              {/* ─── SIDEBAR ANULATE ─── */}
              {(anulateManager.length > 0 || anulateClient.length > 0) && (
                <div className="act-sidebar">

                  {anulateManager.length > 0 && (
                    <div className="act-sidebar-sectiune">
                      <div className="act-sidebar-header" onClick={() => setShowAnulateManager(v => !v)}>
                        <span>Anulate de mine ({anulateManager.length})</span>
                        <span className="act-sidebar-arrow">{showAnulateManager ? '▲' : '▼'}</span>
                      </div>
                      {showAnulateManager && (
                        <div className="act-sidebar-lista">
                          {anulateManager.map(r => (
                            <div key={r.id} className="act-sidebar-card">
                              <div className="act-sidebar-nr">#{r.id}</div>
                              <div className="act-sidebar-client">{r.user?.nume}</div>
                              <div className="act-sidebar-data">{formatDataScurt(r.data)}, {r.ora}</div>
                              <button
                                className="act-btn-restaureaza"
                                onClick={() => handleRezervare(r.id, 'in_asteptare')}
                                disabled={procesand === `rez-${r.id}`}
                              >
                                Restaurează
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {anulateClient.length > 0 && (
                    <div className="act-sidebar-sectiune">
                      <div className="act-sidebar-header" onClick={() => setShowAnulateClient(v => !v)}>
                        <span>Anulate de clienți ({anulateClient.length})</span>
                        <span className="act-sidebar-arrow">{showAnulateClient ? '▲' : '▼'}</span>
                      </div>
                      {showAnulateClient && (
                        <div className="act-sidebar-lista">
                          {anulateClient.map(r => (
                            <div key={r.id} className="act-sidebar-card">
                              <div className="act-sidebar-nr">#{r.id}</div>
                              <div className="act-sidebar-client">{r.user?.nume}</div>
                              <div className="act-sidebar-data">{formatDataScurt(r.data)}, {r.ora}</div>
                              <div className="act-anulata-client-label">Anulată de client</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* ─── MAIN: CONFIRMATE ─── */}
              <div className="act-main">
                <div className="act-sectiune-titlu-mare">
                  Rezervări confirmate
                  <span className="act-count">{confirmate.length}</span>
                </div>

                {confirmate.length === 0 ? (
                  <div className="act-gol">Nu există rezervări confirmate.</div>
                ) : (
                  <div className="act-lista">
                    {confirmate.map(r => (
                      <div key={r.id} className="act-rez-card">
                        <div className="act-rez-header">
                          <div className="act-rez-header-stanga">
                            <span className="act-rez-nr">Rezervare #{r.id}</span>
                            <span className="act-rez-client">
                              {r.user?.nume}
                              <span className="act-rez-email">{r.user?.email}</span>
                            </span>
                          </div>
                          <div className="act-rez-header-dreapta">
                            <span className="act-status act-status-confirmata">Confirmată</span>
                            {confirmareAnulare === r.id ? (
                              <div className="act-confirmare-inline">
                                <span>Sigur anulezi?</span>
                                <button className="act-btn-respinge" onClick={() => { handleRezervare(r.id, 'anulata'); setConfirmareAnulare(null) }} disabled={procesand === `rez-${r.id}`}>Da</button>
                                <button className="act-btn-anulare-nu" onClick={() => setConfirmareAnulare(null)}>Nu</button>
                              </div>
                            ) : (
                              <button className="act-btn-respinge" onClick={() => setConfirmareAnulare(r.id)} disabled={procesand === `rez-${r.id}`}>Anulează</button>
                            )}
                          </div>
                        </div>

                        <div className="act-rez-detalii">
                          <span>{formatData(r.data)}</span>
                          <span className="act-rez-sep">·</span>
                          <span>{r.ora}</span>
                          <span className="act-rez-sep">·</span>
                          <span>{ZONA_LABEL[r.zona]}</span>
                          <span className="act-rez-sep">·</span>
                          <span>{r.nrPersoane} pers.</span>
                          {r.ocazie && <><span className="act-rez-sep">·</span><span className="act-ocazie">{r.ocazie}</span></>}
                        </div>

                        {r.observatii && <div className="act-obs">Observații: {r.observatii}</div>}

                        <RandComanda comanda={r.comanda} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminActivitate
