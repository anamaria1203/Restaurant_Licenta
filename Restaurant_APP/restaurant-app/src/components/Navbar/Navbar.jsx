import './Navbar.css'
import { useState, useEffect, useRef } from 'react'
import { getMesajeleMele, getConfirmateNevazute } from '../../services/api'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAdminDropdown, setShowAdminDropdown] = useState(false)
  const [showContMeu, setShowContMeu] = useState(false)
  const [userLogat, setUserLogat] = useState(null)
  const [showConfirmare, setShowConfirmare] = useState(false)
  const [nrCos, setNrCos] = useState(0)
  const [nrMesajeNoi, setNrMesajeNoi] = useState(0)
  const [nrRezervariConfirmate, setNrRezervariConfirmate] = useState(0)
  const contMeuRef = useRef(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setUserLogat(JSON.parse(user))
  }, [])

  useEffect(() => {
    const updateNrCos = () => {
      try {
        const cos = JSON.parse(localStorage.getItem('cos')) || []
        setNrCos(cos.reduce((s, i) => s + i.cantitate, 0))
      } catch { setNrCos(0) }
    }
    updateNrCos()
    window.addEventListener('cos-update', updateNrCos)
    window.addEventListener('storage', updateNrCos)
    return () => {
      window.removeEventListener('cos-update', updateNrCos)
      window.removeEventListener('storage', updateNrCos)
    }
  }, [])

  useEffect(() => {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()
    if (!user || user.tip !== 'client') return
    const calculeazaNoi = () => {
      getMesajeleMele().then(mesaje => {
        const vazute = JSON.parse(localStorage.getItem('mesaje_vazute') || '[]')
        setNrMesajeNoi(mesaje.filter(m => m.raspuns && !vazute.includes(m.id)).length)
      }).catch(() => {})
    }
    calculeazaNoi()
    window.addEventListener('mesaje-update', calculeazaNoi)
    return () => window.removeEventListener('mesaje-update', calculeazaNoi)
  }, [])

  useEffect(() => {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()
    if (!user || user.tip !== 'client') return
    getConfirmateNevazute().then(data => setNrRezervariConfirmate(data.count || 0)).catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contMeuRef.current && !contMeuRef.current.contains(e.target)) {
        setShowContMeu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDeconectare = async () => {
    await fetch('http://localhost:8080/auth/logout', { method: 'POST', credentials: 'include' })
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const totalBadge = nrCos + nrMesajeNoi + nrRezervariConfirmate

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <a href="/" className="nav-logo">Villa Ana Ristorante</a>
        {userLogat && userLogat.tip === 'manager' && (
          <a href="/admin-dashboard" className="btn-dashboard">← Dashboard Admin</a>
        )}
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/meniu">Meniu</a>
        <a href="/meniu-lunii">Meniul Lunii</a>
        <a href="/despre">Despre noi</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="nav-right">
        {userLogat ? (
          <div className="user-logat">
            <div className="user-hello">
              Hello, <strong>{userLogat.nume}</strong>
            </div>

            {userLogat.tip === 'client' && (
              <div className="cont-meu-wrapper" ref={contMeuRef}>
                <button
                  className="btn-cont-meu"
                  onClick={() => { setShowContMeu(v => !v); setShowConfirmare(false) }}
                >
                  Contul Meu
                  {totalBadge > 0 && <span className="cont-meu-badge">{totalBadge}</span>}
                  <span className="cont-meu-chevron">{showContMeu ? '▴' : '▾'}</span>
                </button>
                {showContMeu && (
                  <div className="cont-meu-dropdown">
                    <a href="/comanda" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">🍽</span>
                      <span>Comenzi</span>
                    </a>
                    <a href="/rezervare" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">📅</span>
                      <span>Rezervare nouă</span>
                    </a>
                    <a href="/rezervarile-mele" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">📋</span>
                      <span>Rezervări & Comenzi</span>
                      {nrRezervariConfirmate > 0 && <span className="cont-item-badge verde">{nrRezervariConfirmate}</span>}
                    </a>
                    <a href="/cos" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">🛒</span>
                      <span>Coș</span>
                      {nrCos > 0 && <span className="cont-item-badge">{nrCos}</span>}
                    </a>
                    <a href="/preferintele-mele" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">⭐</span>
                      <span>Preferatele Mele</span>
                    </a>
                    <a href="/mesajele-mele" className="cont-item" onClick={() => setShowContMeu(false)}>
                      <span className="cont-item-icon">✉</span>
                      <span>Mesajele Mele</span>
                      {nrMesajeNoi > 0 && <span className="cont-item-badge rosu">{nrMesajeNoi}</span>}
                    </a>
                  </div>
                )}
              </div>
            )}

            {userLogat.tip === 'client' && (
              <div className="deconectare-wrapper">
                <button
                  className="btn-deconectare"
                  onClick={() => { setShowConfirmare(!showConfirmare); setShowContMeu(false) }}
                >
                  Deconectare
                </button>
                {showConfirmare && (
                  <div className="confirmare-dropdown">
                    <p>Esti sigur ca vrei sa te deconectezi?</p>
                    <div className="confirmare-butoane">
                      <button className="btn-da" onClick={handleDeconectare}>Da</button>
                      <button className="btn-nu" onClick={() => setShowConfirmare(false)}>Nu</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <div
              className="signin-wrapper"
              onMouseEnter={() => setShowAdminDropdown(true)}
              onMouseLeave={() => setShowAdminDropdown(false)}
            >
              <button className="btn-admin">Admin Access</button>
              {showAdminDropdown && (
                <div className="signin-dropdown">
                  <div className="dropdown-item" onClick={() => window.location.href='/admin-login?mod=signup'}>
                    <span className="dropdown-icon">✦</span>
                    <div>
                      <div className="dropdown-title">Become Admin</div>
                      <div className="dropdown-desc">Creeaza cont administrator</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => window.location.href='/admin-login?mod=login'}>
                    <span className="dropdown-icon">→</span>
                    <div>
                      <div className="dropdown-title">Admin Login</div>
                      <div className="dropdown-desc">Conecteaza-te ca administrator</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="signin-wrapper"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="btn-login">Sign In</button>
              {showDropdown && (
                <div className="signin-dropdown">
                  <div className="dropdown-item" onClick={() => window.location.href='/login?mod=signup'}>
                    <span className="dropdown-icon">✦</span>
                    <div>
                      <div className="dropdown-title">Cont nou</div>
                      <div className="dropdown-desc">Inregistreaza-te gratuit</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => window.location.href='/login?mod=login'}>
                    <span className="dropdown-icon">→</span>
                    <div>
                      <div className="dropdown-title">Log In</div>
                      <div className="dropdown-desc">Conecteaza-te la contul tau</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
