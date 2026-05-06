import './AdminLogin.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authLogin, authRegister, authAdminLogin } from '../../../services/api'

const AdminLogin = () => {
  const [mod, setMod] = useState('signup')
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [codAdmin, setCodAdmin] = useState('')
  const [eroare, setEroare] = useState('')
  const [eroareEmail, setEroareEmail] = useState('')
  const [eroareParola, setEroareParola] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const [vedeParola, setVedeParola] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const modParam = params.get('mod')
    if (modParam === 'login' || modParam === 'signup') {
      setMod(modParam)
    }
  }, [])

  const resetCampuri = () => {
    setNume('')
    setEmail('')
    setParola('')
    setCodAdmin('')
    setEroare('')
    setEroareEmail('')
    setEroareParola('')
    setSucces('')
    setVedeParola(false)
  }

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Te rugam sa introduci un email valid!'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEroare('')
    setEroareEmail('')
    setEroareParola('')
    setSucces('')

    const emailError = validateEmail(email)
    if (emailError) {
      setEroareEmail(emailError)
      return
    }

    setLoading(true)

    const body = mod === 'signup'
      ? { nume, email, password: parola, codAdmin }
      : { email, password: parola }

    try {
      const response = mod === 'signup'
        ? await authRegister(body)
        : await authAdminLogin(body)

      const data = await response.json()

      if (!response.ok) {
        if (data.error && data.error.includes('deja')) {
          setEroareEmail('Exista deja un cont admin cu acest email!')
        } else if (data.error && data.error.includes('Cod administrator')) {
          setEroare('Codul de administrator este incorect!')
        } else if (data.error && data.error.toLowerCase().includes('parola')) {
          setEroareParola('Parola introdusa este gresita!')
        } else {
          setEroare(data.error)
        }
        setLoading(false)
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))

      if (mod === 'signup') {
        setSucces('Cont admin creat cu succes! Va redirectionam...')
      } else {
        setSucces('Bine ati revenit, Administrator! Va redirectionam...')
      }

      setLoading(false)

      setTimeout(() => {
        navigate('/admin-dashboard')
      }, 2000)

    } catch (err) {
      setEroare('Eroare de conexiune cu serverul')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-overlay"></div>
      <div className="admin-login-container">
        <div className="admin-login-logo">Villa Ana Ristorante</div>
        <div className="admin-login-tagline">Panou de Administrare</div>

        <h2 className="admin-login-title">
          {mod === 'signup' ? 'Cont Administrator Nou' : 'Acces Administrator'}
        </h2>
        <p className="admin-login-subtitle">
          {mod === 'signup' ? 'Creeaza un cont de administrator' : 'Conecteaza-te ca administrator'}
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          {mod === 'signup' && (
            <div className="admin-login-field">
              <label>Nume complet</label>
              <input
                type="text"
                placeholder="Ex: Manager Restaurant"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
                required
              />
            </div>
          )}

          <div className="admin-login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="adresa@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEroareEmail('') }}
              className={eroareEmail ? 'input-eroare' : ''}
            />
            {eroareEmail && (
              <div className="field-eroare">
                ⚠️ {eroareEmail}
              </div>
            )}
          </div>

          <div className="admin-login-field">
            <label>Parola</label>
            <div className="parola-wrapper">
              <input
                type={vedeParola ? 'text' : 'password'}
                placeholder="••••••••"
                value={parola}
                onChange={(e) => { setParola(e.target.value); setEroareParola('') }}
                className={eroareParola ? 'input-eroare' : ''}
              />
              <button
                type="button"
                className="toggle-parola"
                onClick={() => setVedeParola(!vedeParola)}
              >
                {vedeParola ? '🙈' : '👁️'}
              </button>
            </div>
            {eroareParola && (
              <div className="field-eroare">
                ⚠️ {eroareParola}
              </div>
            )}
          </div>

          {mod === 'signup' && (
            <div className="admin-login-field">
              <label>Cod Administrator</label>
              <input
                type="password"
                placeholder="Codul secret de administrator"
                value={codAdmin}
                onChange={(e) => setCodAdmin(e.target.value)}
                required
              />
            </div>
          )}

          {eroare && <div className="admin-login-eroare">{eroare}</div>}
          {succes && <div className="admin-login-succes">{succes}</div>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Se proceseaza...' : mod === 'signup' ? 'Become Admin' : 'Admin Login'}
          </button>
        </form>

        <div className="admin-login-switch">
          {mod === 'signup' ? (
            <span onClick={() => { setMod('login'); resetCampuri() }}>
              Ai deja cont admin? → <strong>Admin Login</strong>
            </span>
          ) : (
            <span onClick={() => { setMod('signup'); resetCampuri() }}>
              Cont admin nou? → <strong>Become Admin</strong>
            </span>
          )}
        </div>

        {mod === 'login' && (
          <div className="admin-login-forgot" onClick={() => navigate('/reset-parola')}>
            <span>
              🔑 Ai uitat parola? <strong>Reseteaz-o aici</strong>
            </span>
          </div>
        )}

        <div className="admin-login-back">
          <a href="/">← Inapoi la pagina principala</a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
