import './AdminActivitate.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getComenziAdmin, getRezervariAdmin, updateStatusRezervare, updateStatusComanda } from '../../../services/api'

const STATUS_REZ = {
  in_asteptare: { label: 'În așteptare', cls: 'act-status-asteptare' },
  confirmata:   { label: 'Confirmată',   cls: 'act-status-confirmata' },
  anulata:      { label: 'Anulată',      cls: 'act-status-anulata' }
}

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

const AdminActivitate = () => {
  const navigate = useNavigate()
  const [rezervari, setRezervari] = useState([])
  const [loading, setLoading] = useState(true)
  const [procesand, setProcesand] = useState(null)

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
      })).sort((a, b) => new Date(b.data) - new Date(a.data))

      setRezervari(rezervariCuComanda)
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
      if (res.ok) fetchDate()
    } finally { setProcesand(null) }
  }

  const handleComanda = async (id, status) => {
    setProcesand(`com-${id}`)
    try {
      const res = await updateStatusComanda(id, status)
      if (res.ok) fetchDate()
    } finally { setProcesand(null) }
  }

  return (
    <div className="act-page">
      <div className="act-navbar">
        <div className="act-logo">Villa Ana Ristorante</div>
        <div className="act-navbar-center">Comenzi &amp; Rezervări</div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="act-btn-inapoi" onClick={() => navigate('/admin-menu-evolution')}>Menu Evolution</button>
          <button className="act-btn-inapoi" onClick={() => navigate('/admin-statistici')}>Statistici</button>
          <button className="act-btn-inapoi" onClick={() => navigate('/admin-dashboard')}>← Dashboard</button>
        </div>
      </div>

      <div className="act-content">
        <div className="act-header">
          <h1>Activitate Restaurant</h1>
          <p>Rezervări cu comenzile asociate și comenzi independente</p>
        </div>

        {loading ? (
          <div className="act-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : (
          <>
            {/* ─── REZERVĂRI ─── */}
            <div className="act-sectiune-titlu-mare">
              Rezervări
              <span className="act-count">{rezervari.filter(r => r.status !== 'anulata').length}</span>
            </div>

            {rezervari.length === 0 ? (
              <div className="act-gol">Nu există rezervări înregistrate.</div>
            ) : (
              <div className="act-lista">
                {rezervari.map(r => (
                  <div key={r.id} className={`act-rez-card${r.status === 'anulata' ? ' anulata' : ''}`}>

                    {/* Header rezervare */}
                    <div className="act-rez-header">
                      <div className="act-rez-header-stanga">
                        <span className="act-rez-nr">Rezervare #{r.id}</span>
                        <span className="act-rez-client">
                          {r.user?.nume}
                          <span className="act-rez-email">{r.user?.email}</span>
                        </span>
                      </div>
                      <div className="act-rez-header-dreapta">
                        <span className={`act-status ${STATUS_REZ[r.status]?.cls}`}>
                          {STATUS_REZ[r.status]?.label}
                        </span>
                        {r.status === 'in_asteptare' && (
                          <div className="act-butoane">
                            <button className="act-btn-confirma" onClick={() => handleRezervare(r.id, 'confirmata')} disabled={procesand === `rez-${r.id}`}>Confirmă</button>
                            <button className="act-btn-respinge" onClick={() => handleRezervare(r.id, 'anulata')} disabled={procesand === `rez-${r.id}`}>Respinge</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detalii rezervare */}
                    <div className="act-rez-detalii">
                      <span>{new Date(r.data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{r.ora}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{ZONA_LABEL[r.zona]}</span>
                      <span className="act-rez-sep">·</span>
                      <span>{r.nrPersoane} pers.</span>
                      {r.ocazie && <><span className="act-rez-sep">·</span><span className="act-ocazie">{r.ocazie}</span></>}
                    </div>

                    {/* Comanda asociata */}
                    {r.comanda ? (
                      <div className="act-precomanda">
                        <div className="act-precomanda-header">
                          <span className="act-precomanda-label">Comandă pre-comandată</span>
                          <div className="act-precomanda-dreapta">
                            <span className={`act-status ${STATUS_COM[r.comanda.status]?.cls}`}>
                              {STATUS_COM[r.comanda.status]?.label}
                            </span>
                            <div className="act-butoane">
                              {r.comanda.status === 'in_asteptare' && (
                                <>
                                  <button className="act-btn-confirma" onClick={() => handleComanda(r.comanda.id, 'confirmata')} disabled={procesand === `com-${r.comanda.id}`}>Confirmă</button>
                                  <button className="act-btn-respinge" onClick={() => handleComanda(r.comanda.id, 'anulata')} disabled={procesand === `com-${r.comanda.id}`}>Respinge</button>
                                </>
                              )}
                              {r.comanda.status === 'confirmata' && (
                                <button className="act-btn-preparare" onClick={() => handleComanda(r.comanda.id, 'in_preparare')} disabled={procesand === `com-${r.comanda.id}`}>În preparare</button>
                              )}
                              {r.comanda.status === 'in_preparare' && (
                                <button className="act-btn-livrata" onClick={() => handleComanda(r.comanda.id, 'livrata')} disabled={procesand === `com-${r.comanda.id}`}>Livrată</button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="act-precomanda-items">
                          {r.comanda.ComandaItems?.map(item => (
                            <div key={item.id} className="act-precomanda-item">
                              <span className="act-ci-nume">{item.numeSnapshot}</span>
                              <span className="act-ci-cant">× {item.cantitate}</span>
                              <span className="act-ci-pret">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</span>
                            </div>
                          ))}
                        </div>
                        <div className="act-precomanda-total">
                          Total: {Number(r.comanda.total).toFixed(2)} RON
                        </div>
                      </div>
                    ) : (
                      <div className="act-fara-comanda">Nicio pre-comandă asociată</div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  )
}

export default AdminActivitate
