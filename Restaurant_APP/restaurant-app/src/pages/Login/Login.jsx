import './Login.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authLogin, authRegister } from '../../services/api'

const Login = () => {
  const [mod, setMod] = useState('signup')
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
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
      ? { nume, email, password: parola }
      : { email, password: parola }

    try {
      const response = mod === 'signup'
        ? await authRegister(body)
        : await authLogin(body)

      const data = await response.json()

      if (!response.ok) {
        if (data.error && data.error.includes('deja')) {
          setEroareEmail('Exista deja un cont cu acest email!')
        } else if (data.error && data.error.includes('dezactivat')) {
          setEroare('Acest cont a fost dezactivat. Contactati administratorul.')
        } else if (data.error && (data.error.includes('parola') || data.error.includes('incorect'))) {
          setEroareParola('Parola introdusa este gresita!')
        } else {
          setEroare(data.error)
        }
        setLoading(false)
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))

      if (mod === 'signup') {
        setSucces('Cont creat cu succes! Va redirectionam...')
      } else {
        setSucces('Bine ati revenit! Conectare reusita!')
      }

      setLoading(false)

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setEroare('Eroare de conexiune cu serverul')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <div className="login-container">
        <div className="login-logo">Villa Ana Ristorante</div>
        <div className="login-tagline">Where Every Meal Tells a Story</div>

        <h2 className="login-title">
          {mod === 'signup' ? 'Creeaza un cont' : 'Bine ai revenit'}
        </h2>
        <p className="login-subtitle">
          {mod === 'signup' ? 'Inregistreaza-te pentru a continua' : 'Conecteaza-te pentru a continua'}
        </p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {mod === 'signup' && (
            <div className="login-field">
              <label>Nume complet</label>
              <input
                type="text"
                placeholder="Ex: Ana Popescu"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-field">
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

          <div className="login-field">
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

          {eroare && <div className="login-eroare">{eroare}</div>}
          {succes && <div className="login-succes">{succes}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Se proceseaza...' : mod === 'signup' ? 'Sign In' : 'Log In'}
          </button>
        </form>

        <div className="login-switch">
          {mod === 'signup' ? (
            <span onClick={() => { setMod('login'); resetCampuri() }}>
              Ai deja un cont? → <strong>Log In</strong>
            </span>
          ) : (
            <span onClick={() => { setMod('signup'); resetCampuri() }}>
              Nu ai cont? → <strong>Sign In</strong>
            </span>
          )}
        </div>

        {mod === 'login' && (
          <div className="login-forgot" onClick={() => navigate('/reset-parola')}>
            <span>
              🔑 Ai uitat parola? <strong>Reseteaz-o aici</strong>
            </span>
          </div>
        )}

        <div className="login-back">
          <a href="/">← Inapoi la pagina principala</a>
        </div>
      </div>
    </div>
  )
}

export default Login
