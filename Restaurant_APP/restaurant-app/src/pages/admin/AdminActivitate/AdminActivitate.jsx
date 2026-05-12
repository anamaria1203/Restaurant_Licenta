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
  const [clienti, setClienti] = useState([])
  const [loading, setLoading] = useState(true)
  const [procesand, setProcesand] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') {
      navigate('/')
      return
    }
    fetchDate()
  }, [navigate])

  const fetchDate = async () => {
    setLoading(true)
    try {
      const [rezervari, comenzi] = await Promise.all([
        getRezervariAdmin(),
        getComenziAdmin()
      ])

      const map = {}

      rezervari.forEach(r => {
        const uid = r.User.id
        if (!map[uid]) map[uid] = { user: r.User, rezervari: [], comenzi: [] }
        map[uid].rezervari.push(r)
      })

      comenzi.forEach(c => {
        const uid = c.User.id
        if (!map[uid]) map[uid] = { user: c.User, rezervari: [], comenzi: [] }
        map[uid].comenzi.push(c)
      })

      setClienti(Object.values(map).sort((a, b) => a.user.nume.localeCompare(b.user.nume)))
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
    } finally {
      setProcesand(null)
    }
  }

  const handleComanda = async (id, status) => {
    setProcesand(`com-${id}`)
    try {
      const res = await updateStatusComanda(id, status)
      if (res.ok) fetchDate()
    } finally {
      setProcesand(null)
    }
  }

  return (
    <div className="act-page">
      <div className="act-navbar">
        <div className="act-logo">Villa Ana Ristorante</div>
        <div className="act-navbar-center">Comenzi &amp; Rezervări</div>
        <button className="act-btn-inapoi" onClick={() => navigate('/admin-dashboard')}>
          ← Dashboard
        </button>
      </div>

      <div className="act-content">
        <div className="act-header">
          <h1>Activitate Clienți</h1>
          <p>Gestionează rezervările și comenzile clienților</p>
        </div>

        {loading ? (
          <div className="act-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : clienti.length === 0 ? (
          <div className="act-gol">
            <p>Nu există activitate înregistrată.</p>
          </div>
        ) : (
          <div className="act-lista">
            {clienti.map(({ user, rezervari, comenzi }) => (
              <div key={user.id} className="act-client-card">

                <div className="act-client-header">
                  <div className="act-client-info">
                    <span className="act-client-nume">{user.nume}</span>
                    <span className="act-client-email">{user.email}</span>
                  </div>
                  <div className="act-client-badges">
                    <span className="act-badge">{rezervari.length} rezerv.</span>
                    <span className="act-badge">{comenzi.length} com.</span>
                  </div>
                </div>

                {rezervari.length > 0 && (
                  <div className="act-sectiune">
                    <div className="act-sectiune-titlu">Rezervări</div>
                    {rezervari.map(r => (
                      <div key={r.id} className="act-rand">
                        <div className="act-rand-info">
                          <span className="act-rand-nr">#REZ-{r.id}</span>
                          <span>{new Date(r.data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          <span>{r.ora}</span>
                          <span>{ZONA_LABEL[r.zona]}</span>
                          <span>{r.nrPersoane} pers.</span>
                          {r.ocazie && <span className="act-ocazie">{r.ocazie}</span>}
                        </div>
                        <div className="act-rand-dreapta">
                          <span className={`act-status ${STATUS_REZ[r.status]?.cls}`}>
                            {STATUS_REZ[r.status]?.label}
                          </span>
                          {r.status === 'in_asteptare' && (
                            <div className="act-butoane">
                              <button
                                className="act-btn-confirma"
                                onClick={() => handleRezervare(r.id, 'confirmata')}
                                disabled={procesand === `rez-${r.id}`}
                              >Confirmă</button>
                              <button
                                className="act-btn-respinge"
                                onClick={() => handleRezervare(r.id, 'anulata')}
                                disabled={procesand === `rez-${r.id}`}
                              >Respinge</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {comenzi.length > 0 && (
                  <div className="act-sectiune">
                    <div className="act-sectiune-titlu">Comenzi</div>
                    {comenzi.map(c => (
                      <div key={c.id} className="act-rand act-rand-comanda">
                        <div className="act-rand-info act-rand-info-col">
                          <div className="act-rand-info-top">
                            <span className="act-rand-nr">#COM-{c.id}</span>
                            <span>{new Date(c.createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span className="act-total">{Number(c.total).toFixed(2)} RON</span>
                          </div>
                          <div className="act-items-lista">
                            {c.ComandaItems.map(item => (
                              <span key={item.id} className="act-item-chip">
                                {item.numeSnapshot} × {item.cantitate}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="act-rand-dreapta">
                          <span className={`act-status ${STATUS_COM[c.status]?.cls}`}>
                            {STATUS_COM[c.status]?.label}
                          </span>
                          <div className="act-butoane">
                            {c.status === 'in_asteptare' && (
                              <>
                                <button
                                  className="act-btn-confirma"
                                  onClick={() => handleComanda(c.id, 'confirmata')}
                                  disabled={procesand === `com-${c.id}`}
                                >Confirmă</button>
                                <button
                                  className="act-btn-respinge"
                                  onClick={() => handleComanda(c.id, 'anulata')}
                                  disabled={procesand === `com-${c.id}`}
                                >Respinge</button>
                              </>
                            )}
                            {c.status === 'confirmata' && (
                              <button
                                className="act-btn-preparare"
                                onClick={() => handleComanda(c.id, 'in_preparare')}
                                disabled={procesand === `com-${c.id}`}
                              >În preparare</button>
                            )}
                            {c.status === 'in_preparare' && (
                              <button
                                className="act-btn-livrata"
                                onClick={() => handleComanda(c.id, 'livrata')}
                                disabled={procesand === `com-${c.id}`}
                              >Livrată</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminActivitate
