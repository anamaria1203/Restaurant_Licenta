import './Navbar.css'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAdminDropdown, setShowAdminDropdown] = useState(false)
  const [userLogat, setUserLogat] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUserLogat(JSON.parse(user))
    }
  }, [])

  const handleDeconectare = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="navbar">
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <a href="/" className="nav-logo">Villa Ana Ristorante</a>
        {userLogat && userLogat.tip === 'manager' && (
          <a href="/admin-dashboard" className="btn-dashboard">
            ← Dashboard Admin
          </a>
        )}
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/meniu">Meniu</a>
        <a href="/rezervari">Rezervări</a>
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
              <button className="btn-deconectare" onClick={handleDeconectare}>
                Deconectare
              </button>
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