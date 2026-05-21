import './AdminDashboard.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUseri, getUseriStersi, stergeUser, restaureazaUser, getComenziAdmin, getRezervariAdmin } from '../../../services/api'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'

const AdminDashboard = () => {
  const [useri, setUseri] = useState([])
  const [useriStersi, setUseriStersi] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModalStergere, setShowModalStergere] = useState(false)
  const [userDesters, setUserDesters] = useState(null)
  const [showStersi, setShowStersi] = useState(false)
  const [nrRezervariActive, setNrRezervariActive] = useState(0)
  const [nrComenziActive, setNrComenziActive] = useState(0)
  const navigate = useNavigate()

  const clienti = useri.filter(u => u.tip === 'client')

  const fetchUseri = async () => {
    try {
      const response = await getUseri()
      if (response.status === 401) {
        localStorage.removeItem('user')
        navigate('/admin-login?mod=login')
        return
      }
      const data = await response.json()
      setUseri(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Eroare la incarcarea userilor:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStatistici = async () => {
    try {
      const [rez, com] = await Promise.all([getRezervariAdmin(), getComenziAdmin()])
      setNrRezervariActive(rez.filter(r => r.status === 'in_asteptare').length)
      setNrComenziActive(com.filter(c => c.status === 'in_asteptare').length)
    } catch {}
  }

  const fetchUseriStersi = async () => {
    try {
      const response = await getUseriStersi()
      if (response.status === 401) return
      const data = await response.json()
      setUseriStersi(Array.isArray(data) ? data : [])
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
      await stergeUser(userDesters.id)
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
      await restaureazaUser(id)
      fetchUseri()
      fetchUseriStersi()
    } catch (err) {
      console.error('Eroare la restaurare:', err)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') {
      navigate('/')
      return
    }
    fetchUseri()
    fetchUseriStersi()
    fetchStatistici()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <div className="dashboard-page">
      <AdminNavbar title="Panou Administrator" />

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
          <div className="stat-card" style={{cursor:'pointer'}} onClick={() => navigate('/admin-activitate')}>
            <div className="stat-number">{nrRezervariActive}</div>
            <div className="stat-label">Rezervari in asteptare</div>
          </div>
          <div className="stat-card" style={{cursor:'pointer'}} onClick={() => navigate('/admin-activitate')}>
            <div className="stat-number">{nrComenziActive}</div>
            <div className="stat-label">Comenzi in asteptare</div>
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
