import './AdminDashboard.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [useri, setUseri] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConfirmare, setShowConfirmare] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') {
      navigate('/')
      return
    }
    fetchUseri()
  }, [navigate])

  const fetchUseri = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/useri', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setUseri(data)
    } catch (err) {
      console.error('Eroare la incarcarea userilor:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-navbar">
        <div className="dashboard-logo">Villa Ana Ristorante</div>
        <div className="dashboard-nav-links">
          <span className="dashboard-tag">Panou Administrator</span>
        </div>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <button className="dashboard-home" onClick={() => navigate('/')}>
            ← Pagina Principala
          </button>
          <div style={{position: 'relative'}}>
            <button
              className="dashboard-logout"
              onClick={() => setShowConfirmare(!showConfirmare)}
            >
              Deconectare
            </button>
            {showConfirmare && (
              <div className="confirmare-dropdown">
                <p>Esti sigur ca vrei sa te deconectezi?</p>
                <div className="confirmare-butoane">
                  <button className="btn-da" onClick={handleLogout}>Da</button>
                  <button className="btn-nu" onClick={() => setShowConfirmare(false)}>Nu</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Bine ai venit, Administrator!</h1>
          <p>Gestioneaza restaurantul din acest panou de control</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{useri.length}</div>
            <div className="stat-label">Clienti inregistrati</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Rezervari active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Comenzi active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Preparate in meniu</div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Clienti inregistrati</h2>
          {loading ? (
            <p className="dashboard-loading">Se incarca...</p>
          ) : (
            <table className="useri-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nume</th>
                  <th>Email</th>
                  <th>Tip cont</th>
                  <th>Data inregistrarii</th>
                </tr>
              </thead>
              <tbody>
                {useri.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nume}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`tip-badge ${user.tip}`}>
                        {user.tip === 'client' ? 'Client' : 'Manager'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString('ro-RO')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard