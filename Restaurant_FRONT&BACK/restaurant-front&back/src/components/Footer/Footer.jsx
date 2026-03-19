import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <div className="footer-logo">Villa Ana Ristorante</div>
          <p className="footer-desc">
             Where Every Meal Tells a Story — o experiență culinară
  de neuitat, unde pasiunea pentru gust se întâlnește cu eleganța.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navigare</h4>
          <a href="/">Home</a>
          <a href="/meniu">Meniu</a>
          <a href="/rezervari">Rezervări</a>
          <a href="/despre">Despre noi</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
        <p>Calea Victoriei nr. 12, Sector 1</p>
        <p>București, România</p>
        <p>+40 721 000 000</p>
        <p>rezervari@villaana.ro</p>
        <p>Lun — Dum: 12:00 — 23:00</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Villa Ana Ristorante. Toate drepturile rezervate.</p>
      </div>
    </footer>
  )
}

export default Footer