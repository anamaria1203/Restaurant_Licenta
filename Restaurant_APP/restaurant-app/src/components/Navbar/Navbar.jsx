import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar">
      <a href="/" className="nav-logo">Villa Ana Ristorante</a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/meniu">Meniu</a>
        <a href="/rezervari">Rezervări</a>
        <a href="/despre">Despre noi</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="nav-right">
        <button className="btn-admin" onClick={() => window.location.href='/admin-login'}>
          Admin Access
        </button>

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
      </div>
    </nav>
  )
}

export default Navbar