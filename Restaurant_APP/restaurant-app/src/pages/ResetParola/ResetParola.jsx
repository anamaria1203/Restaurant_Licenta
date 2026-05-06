import './ResetParola.css'
import { useState } from 'react'
import { verificaEmail, resetParola as apiResetParola } from '../../services/api'

const ResetParola = () => {
  const [email, setEmail] = useState('')
  const [parolaNoua, setParolaNoua] = useState('')
  const [confirmaParola, setConfirmaParola] = useState('')
  const [vedeParola, setVedeParola] = useState(false)
  const [eroare, setEroare] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const [pas, setPas] = useState(1)

  const handleVerificaEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    setEroare('')

    try {
      const response = await verificaEmail(email)

      const data = await response.json()

      if (!response.ok) {
        setEroare(data.error)
      } else {
        setPas(2)
      }
    } catch (err) {
      setEroare('Eroare de conexiune cu serverul')
    } finally {
      setLoading(false)
    }
  }

  const handleResetParola = async (e) => {
    e.preventDefault()
    setEroare('')

    if (parolaNoua !== confirmaParola) {
      setEroare('Parolele nu coincid!')
      return
    }

    if (parolaNoua.length < 6) {
      setEroare('Parola trebuie sa aiba cel putin 6 caractere!')
      return
    }

    setLoading(true)

    try {
      const response = await apiResetParola(email, parolaNoua)

      const data = await response.json()

      if (!response.ok) {
        setEroare(data.error)
      } else {
        setSucces('Parola a fost resetata cu succes! Va redirectionam...')
        setTimeout(() => {
          window.location.replace('/login?mod=login')
        }, 2000)
      }
    } catch (err) {
      setEroare('Eroare de conexiune cu serverul')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reset-page">
      <div className="reset-overlay"></div>
      <div className="reset-container">
        <div className="reset-logo">Villa Ana Ristorante</div>
        <div className="reset-tagline">Where Every Meal Tells a Story</div>

        {pas === 1 && (
          <>
            <h2 className="reset-title">Reseteaza parola</h2>
            <p className="reset-subtitle">Introdu emailul contului tau</p>

            <form className="reset-form" onSubmit={handleVerificaEmail}>
              <div className="reset-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="exemplu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEroare('') }}
                  required
                />
              </div>

              {eroare && <div className="reset-eroare">⚠️ {eroare}</div>}

              <button type="submit" className="reset-btn" disabled={loading}>
                {loading ? 'Se verifica...' : 'Continua'}
              </button>
            </form>
          </>
        )}

        {pas === 2 && (
          <>
            <h2 className="reset-title">Parola noua</h2>
            <p className="reset-subtitle">Introdu noua ta parola</p>

            <form className="reset-form" onSubmit={handleResetParola}>
              <div className="reset-field">
                <label>Parola noua</label>
                <div className="parola-wrapper">
                  <input
                    type={vedeParola ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={parolaNoua}
                    onChange={(e) => setParolaNoua(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-parola"
                    onClick={() => setVedeParola(!vedeParola)}
                  >
                    {vedeParola ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="reset-field">
                <label>Confirma parola</label>
                <div className="parola-wrapper">
                  <input
                    type={vedeParola ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmaParola}
                    onChange={(e) => setConfirmaParola(e.target.value)}
                    required
                  />
                </div>
              </div>

              {eroare && <div className="reset-eroare">⚠️ {eroare}</div>}
              {succes && <div className="reset-succes">{succes}</div>}

              <button type="submit" className="reset-btn" disabled={loading}>
                {loading ? 'Se salveaza...' : 'Salveaza parola'}
              </button>
            </form>
          </>
        )}

        <div className="reset-back">
          <a href="/login?mod=login">← Inapoi la Log In</a>
        </div>
      </div>
    </div>
  )
}

export default ResetParola