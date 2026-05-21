import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUseri, authLogout, getMesaje, getMesajeNecititeCount, raspundeMesaj, getAnulateNenotificate, marcheazaAnulateVazute } from '../../services/api'
import './AdminNavbar.css'

const AdminNavbar = ({ title }) => {
  const navigate = useNavigate()
  const [manageri, setManageri] = useState([])
  const [showManageri, setShowManageri] = useState(false)
  const [showConfirmare, setShowConfirmare] = useState(false)
  const [necitite, setNecitite] = useState(0)
  const [nrAnulate, setNrAnulate] = useState(0)
  const [anulateDetalii, setAnulateDetalii] = useState([])
  const [showAnulate, setShowAnulate] = useState(false)
  const [showMesaje, setShowMesaje] = useState(false)
  const [mesaje, setMesaje] = useState([])
  const [raspunsuri, setRaspunsuri] = useState({})
  const [trimitand, setTrimitand] = useState(null)

  useEffect(() => {
    getUseri()
      .then(res => res.json())
      .then(data => setManageri((Array.isArray(data) ? data : []).filter(u => u.tip === 'manager')))
      .catch(() => {})
    getMesajeNecititeCount()
      .then(data => setNecitite(data.count || 0))
      .catch(() => {})
    getAnulateNenotificate()
      .then(data => { setNrAnulate(data.count || 0); setAnulateDetalii(data.rezervari || []) })
      .catch(() => {})
  }, [])

  const handleDeschideMesaje = async () => {
    const nouVal = !showMesaje
    setShowMesaje(nouVal)
    setShowManageri(false)
    setShowConfirmare(false)
    if (nouVal) {
      const data = await getMesaje().catch(() => [])
      setMesaje(Array.isArray(data) ? data : [])
    }
  }

  const handleRaspunde = async (id) => {
    const text = raspunsuri[id]
    if (!text?.trim()) return
    setTrimitand(id)
    try {
      const updated = await raspundeMesaj(id, text)
      setMesaje(prev => prev.map(m => m.id === id ? updated : m))
      setRaspunsuri(prev => ({ ...prev, [id]: '' }))
      setNecitite(prev => Math.max(0, prev - 1))
    } finally {
      setTrimitand(null)
    }
  }

  const handleLogout = async () => {
    await authLogout()
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-logo">Villa Ana Ristorante</div>
      <div className="admin-navbar-center">
        <span className="admin-navbar-tag">{title}</span>
      </div>
      <div className="admin-navbar-right">

        {nrAnulate > 0 && (
          <div style={{ position: 'relative' }}>
            <button
              className="admin-nav-btn admin-bell-btn"
              onClick={() => {
                const nou = !showAnulate
                setShowAnulate(nou)
                setShowMesaje(false)
                setShowManageri(false)
                setShowConfirmare(false)
                if (nou) {
                  marcheazaAnulateVazute().catch(() => {})
                  setNrAnulate(0)
                }
              }}
              title="Rezervări anulate de clienți"
            >
              <span className="admin-bell-icon">❌</span>
              <span className="admin-bell-badge">{nrAnulate}</span>
            </button>
            {showAnulate && (
              <div className="admin-mesaje-dropdown">
                <p className="admin-manageri-titlu">Rezervări anulate de clienți</p>
                {anulateDetalii.length === 0 ? (
                  <p className="admin-manageri-gol">Nicio rezervare anulată.</p>
                ) : (
                  anulateDetalii.map(r => (
                    <div key={r.id} className="admin-mesaj-row citit">
                      <div className="admin-mesaj-header">
                        <span className="admin-mesaj-nume">{r.User?.nume || '—'}</span>
                        <span className="admin-mesaj-email">{r.User?.email || ''}</span>
                      </div>
                      <p className="admin-mesaj-text">
                        Rezervare #{r.id} — {new Date(r.data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })} ora {r.ora}
                      </p>
                    </div>
                  ))
                )}
                <button
                  className="admin-mesaj-reply-btn"
                  style={{ marginTop: '8px', width: '100%' }}
                  onClick={() => { setShowAnulate(false); navigate('/admin-activitate') }}
                >
                  Vezi în activitate
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <button className="admin-nav-btn admin-bell-btn" onClick={handleDeschideMesaje}>
            <span className="admin-bell-icon">🔔</span>
            {necitite > 0 && <span className="admin-bell-badge">{necitite}</span>}
          </button>
          {showMesaje && (
            <div className="admin-mesaje-dropdown">
              <p className="admin-manageri-titlu">Mesaje de la clienți</p>
              {mesaje.length === 0 ? (
                <p className="admin-manageri-gol">Nu există mesaje.</p>
              ) : (
                mesaje.map(m => (
                  <div key={m.id} className={`admin-mesaj-row${m.citit ? ' citit' : ''}`}>
                    <div className="admin-mesaj-header">
                      <span className="admin-mesaj-nume">{m.nume}</span>
                      <span className="admin-mesaj-email">{m.email}</span>
                    </div>
                    <p className="admin-mesaj-text">{m.intrebare}</p>
                    {m.raspuns ? (
                      <div className="admin-mesaj-raspuns-existent">
                        <span className="admin-mesaj-raspuns-label">Răspuns trimis:</span>
                        <p>{m.raspuns}</p>
                      </div>
                    ) : (
                      <div className="admin-mesaj-reply">
                        <textarea
                          className="admin-mesaj-reply-input"
                          placeholder="Scrie răspunsul..."
                          rows={2}
                          value={raspunsuri[m.id] || ''}
                          onChange={e => setRaspunsuri(prev => ({ ...prev, [m.id]: e.target.value }))}
                        />
                        <button
                          className="admin-mesaj-reply-btn"
                          onClick={() => handleRaspunde(m.id)}
                          disabled={trimitand === m.id}
                        >
                          {trimitand === m.id ? '...' : 'Trimite'}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button className="admin-nav-btn" onClick={() => navigate('/')}>← Pagina Principala</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-activitate')}>Comenzi &amp; Rezervări</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-meniu')}>Meniu Țări</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-statistici')}>Statistici</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-menu-evolution')}>Menu Evolution</button>

        <div style={{ position: 'relative' }}>
          <button
            className="admin-nav-btn admin-nav-btn-gold"
            onClick={() => { setShowManageri(v => !v); setShowConfirmare(false); setShowMesaje(false) }}
          >
            Manageri ({manageri.length})
          </button>
          {showManageri && (
            <div className="admin-manageri-dropdown">
              <p className="admin-manageri-titlu">Conturi Manager</p>
              {manageri.length === 0 ? (
                <p className="admin-manageri-gol">Nu există manageri.</p>
              ) : (
                manageri.map(m => (
                  <div key={m.id} className="admin-manager-row">
                    <span className="admin-manager-nume">{m.nume}</span>
                    <span className="admin-manager-email">{m.email}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="admin-nav-btn admin-nav-btn-logout"
            onClick={() => { setShowConfirmare(v => !v); setShowManageri(false); setShowMesaje(false) }}
          >
            Deconectare
          </button>
          {showConfirmare && (
            <div className="admin-confirmare-dropdown">
              <p>Ești sigur că vrei să te deconectezi?</p>
              <div className="admin-confirmare-butoane">
                <button className="admin-btn-da" onClick={handleLogout}>Da</button>
                <button className="admin-btn-nu" onClick={() => setShowConfirmare(false)}>Nu</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AdminNavbar
