import './Cos.css'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { creeazaComanda, areRezervareConfirmata, getRezervariMele } from '../../services/api'

const GatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <h2 className="gate-title">Ai cont pentru a comanda?</h2>
      <p className="gate-subtitle">
        Autentifică-te sau creează un cont gratuit pentru a plasa o comandă
      </p>
      <div className="gate-butoane">
        <a href="/login?mod=login" className="gate-btn gate-btn-primary">Da, am cont → Conectează-te</a>
        <a href="/login?mod=signup" className="gate-btn gate-btn-secondary">Nu am cont → Înregistrează-te gratuit</a>
      </div>
      <div className="gate-back"><a href="/">← Înapoi la pagina principală</a></div>
    </div>
  </div>
)

const RezervareGatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <h2 className="gate-title">Este necesară o rezervare confirmată</h2>
      <p className="gate-subtitle">
        Pentru a plasa o comandă trebuie să ai o rezervare confirmată la restaurant.
      </p>
      <div className="gate-butoane">
        <a href="/rezervare" className="gate-btn gate-btn-primary">Fă o rezervare</a>
        <a href="/rezervarile-mele" className="gate-btn gate-btn-secondary">Rezervările mele</a>
      </div>
      <div className="gate-back"><a href="/">← Înapoi la pagina principală</a></div>
    </div>
  </div>
)

const AsteptareGatePage = () => (
  <div className="gate-page">
    <div className="gate-overlay" />
    <div className="gate-container">
      <div className="gate-logo">Villa Ana Ristorante</div>
      <div className="gate-tagline">Comandă online, simplu și rapid</div>
      <div className="gate-asteptare-icon">⏳</div>
      <h2 className="gate-title">Rezervarea ta este în așteptare</h2>
      <p className="gate-subtitle">
        Rezervarea ta a fost înregistrată și urmează să fie confirmată de echipa noastră.
        Vei putea comanda imediat ce rezervarea este confirmată.
      </p>
      <div className="gate-butoane">
        <a href="/rezervarile-mele" className="gate-btn gate-btn-primary">Vezi rezervarea mea</a>
        <a href="/" className="gate-btn gate-btn-secondary">Înapoi acasă</a>
      </div>
    </div>
  </div>
)

const getCosLocal = () => {
  try { return JSON.parse(localStorage.getItem('cos')) || [] } catch { return [] }
}

const Cos = () => {
  const userLogat = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  }, [])

  const [cos, setCos] = useState(getCosLocal)
  const [observatii, setObservatii] = useState('')
  const [loadingComanda, setLoadingComanda] = useState(false)
  const [eroare, setEroare] = useState('')
  const [succes, setSucces] = useState(false)
  const [rezervareOk, setRezervareOk] = useState(null)
  const [asteptare, setAsteptare] = useState(false)
  const [loadingRezervare, setLoadingRezervare] = useState(true)
  const [rezervariConfirmate, setRezervariConfirmate] = useState([])
  const [rezervareSelectata, setRezervareSelectata] = useState('')

  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') {
      setLoadingRezervare(false)
      return
    }
    areRezervareConfirmata()
      .then(data => {
        setRezervareOk(data.areRezervare)
        setAsteptare(data.areRezervareInAsteptare)
      })
      .catch(() => setRezervareOk(false))
      .finally(() => setLoadingRezervare(false))

    getRezervariMele()
      .then(data => setRezervariConfirmate(
        (Array.isArray(data) ? data : []).filter(r => r.status === 'confirmata')
      ))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const sync = () => setCos(getCosLocal())
    window.addEventListener('cos-update', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('cos-update', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const saveCos = (nouCos) => {
    setCos(nouCos)
    localStorage.setItem('cos', JSON.stringify(nouCos))
    window.dispatchEvent(new Event('cos-update'))
  }

  const adaugaCantitate = (preparatId) =>
    saveCos(cos.map(i => i.preparatId === preparatId ? { ...i, cantitate: i.cantitate + 1 } : i))

  const scadeCantitate = (preparatId) => {
    const item = cos.find(i => i.preparatId === preparatId)
    saveCos(item.cantitate === 1
      ? cos.filter(i => i.preparatId !== preparatId)
      : cos.map(i => i.preparatId === preparatId ? { ...i, cantitate: i.cantitate - 1 } : i)
    )
  }

  const sterge = (preparatId) => saveCos(cos.filter(i => i.preparatId !== preparatId))

  const total = cos.reduce((s, i) => s + i.pretSnapshot * i.cantitate, 0)

  const handlePlaseaza = async () => {
    if (cos.length === 0) return
    setLoadingComanda(true)
    setEroare('')
    try {
      const response = await creeazaComanda(cos, observatii, rezervareSelectata || null)
      const data = await response.json()
      if (!response.ok) {
        setEroare(data.error || 'Eroare la plasarea comenzii')
      } else {
        localStorage.removeItem('cos')
        window.dispatchEvent(new Event('cos-update'))
        setCos([])
        setObservatii('')
        setSucces(true)
      }
    } catch {
      setEroare('Eroare de conexiune cu serverul')
    } finally {
      setLoadingComanda(false)
    }
  }

  if (!userLogat || userLogat.tip !== 'client') return <GatePage />
  if (loadingRezervare) return (
    <div className="cos-page">
      <Navbar />
      <div className="cos-loading">
        <div className="loading-dots"><span /><span /><span /></div>
        <p>Se verifică rezervarea...</p>
      </div>
    </div>
  )
  if (!rezervareOk) return asteptare ? <AsteptareGatePage /> : <RezervareGatePage />

  if (succes) return (
    <div className="cos-page">
      <Navbar />
      <div className="cos-succes-wrap">
        <div className="cos-succes-card">
          <div className="succes-check">✓</div>
          <h2>Comanda a fost plasată!</h2>
          <p>Îți mulțumim! Comanda ta a fost înregistrată și va fi procesată în curând.</p>
          <div className="succes-butoane">
            <a href="/comenzile-mele" className="btn-succes-primary">Vezi comenzile mele</a>
            <button className="btn-succes-secondary" onClick={() => setSucces(false)}>Comandă din nou</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="cos-page">
      <Navbar />

      <div className="cos-hero">
        <div className="cos-tag">Contul meu</div>
        <h1>Coșul Meu</h1>
        <p>Revizuiește și plasează comanda</p>
      </div>

      <div className="cos-body">
        {cos.length === 0 ? (
          <div className="cos-gol">
            <div className="cos-gol-icon">🛒</div>
            <h3>Coșul este gol</h3>
            <p>Adaugă preparate din meniu sau din pagina de comenzi.</p>
            <a href="/comanda" className="cos-btn-browse">Mergi la Comenzi</a>
          </div>
        ) : (
          <div className="cos-container">
            <div className="cos-items">
              {cos.map(item => (
                <div key={item.preparatId} className="cos-item">
                  <div className="cos-item-info">
                    <div className="cos-item-nume">{item.numeSnapshot}</div>
                    <div className="cos-item-pret-unit">{item.pretSnapshot} RON / buc.</div>
                  </div>
                  <div className="cos-item-controls">
                    <button className="cos-ctrl-btn" onClick={() => scadeCantitate(item.preparatId)}>−</button>
                    <span className="cos-ctrl-nr">{item.cantitate}</span>
                    <button className="cos-ctrl-btn" onClick={() => adaugaCantitate(item.preparatId)}>+</button>
                    <button className="cos-ctrl-btn sterge" onClick={() => sterge(item.preparatId)}>✕</button>
                  </div>
                  <div className="cos-item-subtotal">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</div>
                </div>
              ))}
            </div>

            <div className="cos-footer">
              {rezervariConfirmate.length > 0 && (
                <div className="cos-rezervare-link">
                  <label>Asociază cu o rezervare (opțional)</label>
                  <select
                    value={rezervareSelectata}
                    onChange={e => setRezervareSelectata(e.target.value)}
                  >
                    <option value="">— Fără rezervare —</option>
                    {rezervariConfirmate.map(r => (
                      <option key={r.id} value={r.id}>
                        {new Date(r.data + 'T12:00:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })} · {r.ora} · {r.nrPersoane} pers.
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="cos-observatii">
                <label>Observații (opțional)</label>
                <textarea
                  placeholder="Alergii, preferințe, mențiuni speciale..."
                  value={observatii}
                  onChange={e => setObservatii(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="cos-total">
                <span>Total estimat</span>
                <span className="cos-total-suma">{total.toFixed(2)} RON</span>
              </div>

              {eroare && <div className="cos-eroare">⚠ {eroare}</div>}

              <button className="cos-btn-plaseaza" onClick={handlePlaseaza} disabled={loadingComanda}>
                {loadingComanda ? 'Se procesează...' : 'Plasează comanda'}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Cos
