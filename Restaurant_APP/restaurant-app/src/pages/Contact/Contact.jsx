import './Contact.css'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { trimiteMesaj } from '../../services/api'

const PROGRAM = [
  { zi: 'Luni',     interval: '12:00 – 23:00', index: 1 },
  { zi: 'Marți',    interval: '12:00 – 23:00', index: 2 },
  { zi: 'Miercuri', interval: '12:00 – 23:00', index: 3 },
  { zi: 'Joi',      interval: '12:00 – 23:00', index: 4 },
  { zi: 'Vineri',   interval: '12:00 – 23:00', index: 5 },
  { zi: 'Sâmbătă',  interval: '12:00 – 23:00', index: 6 },
  { zi: 'Duminică', interval: '12:00 – 23:00', index: 0 },
]

const ziuaCurenta = new Date().getDay()

const ContactForm = () => {
  const userLogat = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()
  const [intrebare, setIntrebare] = useState('')
  const [stare, setStare] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await trimiteMesaj(intrebare)
      if (res.ok) {
        setStare('succes')
        setIntrebare('')
      } else {
        setStare('eroare')
      }
    } catch {
      setStare('eroare')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-form-section">
      <div className="section-label">Scrie-ne</div>
      <h2>Trimite o întrebare</h2>
      {!userLogat || userLogat.tip !== 'client' ? (
        <div className="contact-form-gate">
          <p>Este necesar un cont pentru a trimite un mesaj.</p>
          <div className="contact-form-gate-btns">
            <a href="/login?mod=login" className="contact-gate-btn-primary">Conectează-te</a>
            <a href="/login?mod=signup" className="contact-gate-btn-secondary">Creează cont</a>
          </div>
        </div>
      ) : (
        <>
          <p className="contact-form-sub">Salut, <strong>{userLogat.nume}</strong>! Răspundem în maxim 24 de ore.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <textarea
              placeholder="Scrie întrebarea ta aici..." required rows={4}
              value={intrebare} onChange={e => setIntrebare(e.target.value)}
            />
            <button type="submit" className="contact-form-btn" disabled={loading}>
              {loading ? 'Se trimite...' : 'Trimite întrebarea'}
            </button>
            {stare === 'succes' && (
              <p className="contact-form-succes">
                Mesajul a fost trimis! Vezi răspunsul în <a href="/mesajele-mele">Mesajele mele</a>.
              </p>
            )}
            {stare === 'eroare' && <p className="contact-form-eroare">A apărut o eroare. Încearcă din nou.</p>}
          </form>
        </>
      )}
    </section>
  )
}

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <div className="contact-tag">Villa Ana Ristorante · București</div>
          <h1>Contact</h1>
          <p>Suntem aici pentru orice întrebare sau rezervare</p>
        </div>
      </div>

      <div className="contact-body">
        <section className="contact-main-grid">

          <div className="contact-info-col">

            <div className="contact-card">
              <div className="section-label">Unde ne găsești</div>
              <h2>Informații de contact</h2>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Adresă</span>
                  <span className="contact-item-value">Calea Victoriei nr. 12</span>
                  <span className="contact-item-sub">Sector 1, București, România</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.54a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Telefon</span>
                  <span className="contact-item-value">+40 721 000 000</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">rezervari@villaana.ro</span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="section-label">Când ne poți vizita</div>
              <h2>Program de funcționare</h2>
              <div className="program-list">
                {PROGRAM.map((row) => (
                  <div
                    key={row.index}
                    className={`program-row ${row.index === ziuaCurenta ? 'program-row--azi' : ''}`}
                  >
                    <span className="program-zi">
                      {row.zi}
                      {row.index === ziuaCurenta && <span className="program-badge">Azi</span>}
                    </span>
                    <span className="program-interval">{row.interval}</span>
                  </div>
                ))}
              </div>
              <div className="program-nota">
                Rezervările se pot face telefonic sau prin email.
              </div>
            </div>

          </div>

          <div className="contact-map-col">
            <div className="section-label">Locație</div>
            <h2>Unde ne găsești pe hartă</h2>
            <div className="map-wrapper">
              <iframe
                title="Villa Ana Ristorante — Locație"
                src="https://www.openstreetmap.org/export/embed.html?bbox=26.0903%2C44.4356%2C26.1023%2C44.4436&layer=mapnik&marker=44.4396%2C26.0963"
                allowFullScreen
              />
            </div>
            <a
              className="map-link"
              href="https://www.openstreetmap.org/?mlat=44.4396&mlon=26.0963#map=16/44.4396/26.0963"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deschide harta în browser →
            </a>
          </div>

        </section>
                {/* BANNER 24 ORE */}
        <div className="raspuns-banner">
          <div className="raspuns-icon">✦</div>
          <p>Răspundem la orice întrebare în maxim <span>24 de ore</span></p>
          <div className="raspuns-icon">✦</div>
        </div>

        {/* FAQ + FORMULAR */}
        <div className="faq-form-grid">
          <section className="faq-section">
            <div className="section-label">Întrebări frecvente</div>
            <h2 className="faq-title">Ai o întrebare?</h2>

            <div className="faq-list">

              <div className="faq-item">
                <div className="faq-intrebare">Este necesară rezervarea în avans?</div>
                <div className="faq-raspuns">Rezervarea este obligatorie. O puteți face rapid accesând secțiunea Rezervări din bara de navigare de sus.</div>
              </div>

              <div className="faq-item">
                <div className="faq-intrebare">Aveți opțiuni vegetariene sau vegane?</div>
                <div className="faq-raspuns">Da, meniul nostru include o selecție de preparate vegetariene și vegane, gândite cu aceeași atenție și rafinament ca restul ofertei culinare.</div>
              </div>

              <div className="faq-item">
                <div className="faq-intrebare">Puteți organiza evenimente private?</div>
                <div className="faq-raspuns">Cu plăcere! Oferim posibilitatea de a rezerva întreaga sală sau o zonă privată pentru ocazii speciale — aniversări, cine de afaceri, cereri în căsătorie. Contactați-ne pentru detalii.</div>
              </div>

              <div className="faq-item">
                <div className="faq-intrebare">Aveți parcare disponibilă?</div>
                <div className="faq-raspuns">În apropierea restaurantului există mai multe locuri de parcare publice. De asemenea, recomandăm parcarea din Piața Victoriei, la doar 5 minute de mers pe jos.</div>
              </div>

            </div>
          </section>

          <ContactForm />
        </div>

    {/* SOCIAL MEDIA */}
    <section className="social-section">
  <div className="section-label">Urmărește-ne</div>
  <h2 className="social-title">Fii parte din comunitatea noastră</h2>
  <p className="social-subtitle">Descoperă în fiecare zi inspirație culinară, evenimente exclusive și momente din culisele restaurantului</p>

  <div className="social-grid">

     <div className="social-card social-card--insta">
      <div className="social-card-bg" />
      <div className="social-card-content">
        <div className="social-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
        </div>
        <div className="social-info">
          <span className="social-platform">Instagram</span>
          <span className="social-handle">@villaanaristorante</span>
          <span className="social-desc">Fotografii culinare, momente din bucătărie și povești vizuale</span>
        </div>
      </div>
    </div>

    <div className="social-card social-card--fb">
      <div className="social-card-bg" />
      <div className="social-card-content">
        <div className="social-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </div>
        <div className="social-info">
          <span className="social-platform">Facebook</span>
          <span className="social-handle">Villa Ana Ristorante</span>
          <span className="social-desc">Evenimente, promoții și noutăți din lumea restaurantului</span>
        </div>
      </div>
    </div>


    </div>
    </section>

      </div>

      <Footer />
    </div>
  )
}

export default Contact
