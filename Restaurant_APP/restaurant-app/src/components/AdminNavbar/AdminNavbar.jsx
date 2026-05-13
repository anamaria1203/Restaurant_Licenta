import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUseri, authLogout } from '../../services/api'
import './AdminNavbar.css'

const AdminNavbar = ({ title }) => {
  const navigate = useNavigate()
  const [manageri, setManageri] = useState([])
  const [showManageri, setShowManageri] = useState(false)
  const [showConfirmare, setShowConfirmare] = useState(false)

  useEffect(() => {
    getUseri()
      .then(res => res.json())
      .then(data => setManageri((Array.isArray(data) ? data : []).filter(u => u.tip === 'manager')))
      .catch(() => {})
  }, [])

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
        <button className="admin-nav-btn" onClick={() => navigate('/')}>← Pagina Principala</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-activitate')}>Comenzi &amp; Rezervări</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-meniu')}>Meniu Țări</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-statistici')}>Statistici</button>
        <button className="admin-nav-btn" onClick={() => navigate('/admin-menu-evolution')}>Menu Evolution</button>
        <div style={{ position: 'relative' }}>
          <button
            className="admin-nav-btn admin-nav-btn-gold"
            onClick={() => { setShowManageri(v => !v); setShowConfirmare(false) }}
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
            onClick={() => { setShowConfirmare(v => !v); setShowManageri(false) }}
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
