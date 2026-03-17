import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">

      <a href="/" className="nav-logo">Ana's Restaurant</a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/meniu">Meniu</a>
        <a href="/rezervari">Rezervări</a>
        <a href="/despre">Despre noi</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="nav-right">
        <button className="btn-admin">Admin Access</button>
        <button className="btn-login">Log In</button>
      </div>

    </nav>
  )
}

export default Navbar