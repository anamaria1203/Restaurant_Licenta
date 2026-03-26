import './AdminDashboard.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [useri, setUseri] = useState([])
  const [useriStersi, setUseriStersi] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConfirmare, setShowConfirmare] = useState(false)
  const [showModalStergere, setShowModalStergere] = useState(false)
  const [userDesters, setUserDesters] = useState(null)
  const [showStersi, setShowStersi] = useState(false)
  const [showManageri, setShowManageri] = useState(false)
  const [lunaActiva, setLunaActiva] = useState('spaniola')
  const [loadingLuna, setLoadingLuna] = useState(false)

  const navigate = useNavigate()

  const clienti = useri.filter(u => u.tip === 'client')
  const manageri = useri.filter(u => u.tip === 'manager')

  const fetchLunaActiva = async () => {
    try {
      const res = await fetch('http://localhost:8080/luna/activa')
      const data = await res.json()
      setLunaActiva(data.tara)
    } catch (err) {
      console.error('Eroare la incarcarea lunii active:', err)
    }
  }

  const handleSetLunaActiva = async (tara) => {
    setLoadingLuna(true)
    try {
      await fetch('http://localhost:8080/luna/activa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tara })
      })
      setLunaActiva(tara)
    } catch (err) {
      console.error('Eroare la setarea lunii active:', err)
    } finally {
      setLoadingLuna(false)
    }
  }

  const fetchUseri = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/useri', {
        credentials: 'include'
      })
      const data = await response.json()
      setUseri(data)
    } catch (err) {
      console.error('Eroare la incarcarea userilor:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUseriStersi = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/useri/stersi', {
        credentials: 'include'
      })
      const data = await response.json()
      setUseriStersi(data)
    } catch (err) {
      console.error('Eroare la incarcarea userilor stersi:', err)
    }
  }

  const handleStergeClick = (user) => {
    setUserDesters(user)
    setShowModalStergere(true)
  }

  const handleConfirmaStergere = async () => {
    try {
      await fetch(`http://localhost:8080/api/useri/${userDesters.id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      setShowModalStergere(false)
      setUserDesters(null)
      fetchUseri()
      fetchUseriStersi()
    } catch (err) {
      console.error('Eroare la stergere:', err)
    }
  }

  const handleRestaureaza = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/useri/${id}/restaurare`, {
        method: 'POST',
        credentials: 'include'
      })
      fetchUseri()
      fetchUseriStersi()
    } catch (err) {
      console.error('Eroare la restaurare:', err)
    }
  }

  const handleLogout = async () => {
    await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') {
      navigate('/')
      return
    }
    fetchUseri()
    fetchUseriStersi()
    fetchLunaActiva()
  }, [navigate])

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
            <button className="dashboard-home" onClick={() => navigate('/admin-meniu')} style={{borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c'}}>
               Meniu Țări
            </button>
          </button>
          <div style={{position: 'relative'}}>
            <button
              className="dashboard-manageri-btn"
              onClick={() => { setShowManageri(!showManageri); setShowConfirmare(false) }}
            >
              Manageri ({manageri.length})
            </button>
            {showManageri && (
              <div className="manageri-dropdown">
                <p className="manageri-dropdown-titlu">Conturi Manager</p>
                {manageri.length === 0 ? (
                  <p className="manageri-gol">Nu exista manageri.</p>
                ) : (
                  manageri.map(m => (
                    <div key={m.id} className="manager-row">
                      <span className="manager-nume">{m.nume}</span>
                      <span className="manager-email">{m.email}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div style={{position: 'relative'}}>
            <button
              className="dashboard-logout"
              onClick={() => { setShowConfirmare(!showConfirmare); setShowManageri(false) }}
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
            <div className="stat-number">{clienti.length}</div>
            <div className="stat-label">Clienti inregistrati</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{useriStersi.length}</div>
            <div className="stat-label">Clienti stersi</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Rezervari active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Comenzi active</div>
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
                  <th>Data inregistrarii</th>
                  <th>Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {clienti.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nume}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString('ro-RO')}</td>
                    <td>
                      <button className="btn-sterge" onClick={() => handleStergeClick(user)}>
                        Sterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dashboard-section" style={{marginTop: '2rem'}}>
          <div className="sectiune-header">
            <h2>Clienti stersi</h2>
            <button className="btn-toggle-stersi" onClick={() => setShowStersi(!showStersi)}>
              {showStersi ? 'Ascunde' : `Arata (${useriStersi.length})`}
            </button>
          </div>
          {showStersi && (
            useriStersi.length === 0 ? (
              <p className="dashboard-loading">Nu exista clienti stersi.</p>
            ) : (
              <table className="useri-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nume</th>
                    <th>Email</th>
                    <th>Data stergerii</th>
                    <th>Actiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {useriStersi.map(user => (
                    <tr key={user.id} className="rand-sters">
                      <td>{user.id}</td>
                      <td>{user.nume}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.deletedAt).toLocaleDateString('ro-RO')}</td>
                      <td>
                        <button className="btn-restaureaza" onClick={() => handleRestaureaza(user.id)}>
                          Restaureaza
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>

        <div className="dashboard-section" style={{marginTop: '2rem'}}>
          <h2>Meniul Lunii — Țara Activă</h2>
         <div className="tari-grid">
  {[
    { slug: 'spaniola',      flag: '🇪🇸', label: 'Spaniola',      poze: true  },
    { slug: 'turceasca',     flag: '🇹🇷', label: 'Turceasca',     poze: true  },
    { slug: 'moldoveneasca', flag: '🇲🇩', label: 'Moldoveneasca', poze: false },
    { slug: 'japoneza',      flag: '🇯🇵', label: 'Japoneza',      poze: false },
    { slug: 'norvegiana',    flag: '🇳🇴', label: 'Norvegiana',    poze: false },
  ].map(({ slug, flag, label, poze }) => (
    <div key={slug} className={`tara-card ${lunaActiva === slug ? 'tara-activa' : ''}`}>
      <div className="tara-flag">{flag}</div>
      <div className="tara-nume">{label}</div>
      <span className={`tara-poze-badge ${poze ? '' : 'fara-poze'}`}>
        {poze ? '✓ are poze' : 'fără poze'}
      </span>
      {lunaActiva === slug ? (
        <span className="tara-badge">Activă</span>
      ) : (
        <button
          className="btn-seteaza"
          onClick={() => handleSetLunaActiva(slug)}
          disabled={loadingLuna}
        >
          Setează activă
        </button>
      )}
    </div>
  ))}
</div>

        </div>

      </div>

      {showModalStergere && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">⚠</div>
            <h3>Confirmare stergere</h3>
            <p>Esti sigur ca doriti sa stergeti clientul</p>
            <p className="modal-nume">"{userDesters?.nume}"?</p>
            <p className="modal-sub">Clientul va putea fi restaurat ulterior.</p>
            <div className="modal-butoane">
              <button className="btn-da" onClick={handleConfirmaStergere}>Da, sterge</button>
              <button className="btn-nu" onClick={() => setShowModalStergere(false)}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
