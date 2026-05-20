import './MesajeleMele.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getMesajeleMele, trimiteMesaj } from '../../services/api'

const MesajeleMele = () => {
  const navigate = useNavigate()
  const [mesaje, setMesaje] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [intrebare, setIntrebare] = useState('')
  const [trimitand, setTrimitand] = useState(false)
  const [stare, setStare] = useState(null)
  const [expandat, setExpandat] = useState(null)

  const handleExpandat = (m) => {
    const nouId = expandat === m.id ? null : m.id
    setExpandat(nouId)
    if (nouId && m.raspuns) {
      const vazute = JSON.parse(localStorage.getItem('mesaje_vazute') || '[]')
      if (!vazute.includes(m.id)) {
        localStorage.setItem('mesaje_vazute', JSON.stringify([...vazute, m.id]))
        window.dispatchEvent(new Event('mesaje-update'))
      }
    }
  }

  useEffect(() => {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()
    if (!user || user.tip !== 'client') { navigate('/login?mod=login'); return }
    getMesajeleMele()
      .then(data => setMesaje(Array.isArray(data) ? data : []))
      .catch(() => setMesaje([]))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleTrimite = async (e) => {
    e.preventDefault()
    if (!intrebare.trim()) return
    setTrimitand(true)
    try {
      const res = await trimiteMesaj(intrebare)
      if (res.ok) {
        const nou = await res.json()
        setMesaje(prev => [nou, ...prev])
        setIntrebare('')
        setShowForm(false)
        setStare('succes')
        setTimeout(() => setStare(null), 3000)
      }
    } finally {
      setTrimitand(false)
    }
  }

  const formatData = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('ro-RO', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="mm-page">
      <Navbar />

      <div className="mm-hero">
        <div className="mm-hero-content">
          <div className="mm-tag">Contul meu</div>
          <h1>Mesajele mele</h1>
          <p>Conversațiile tale cu restaurantul</p>
        </div>
      </div>

      <div className="mm-body">

        {stare === 'succes' && (
          <div className="mm-toast">Mesajul a fost trimis! Vei primi un răspuns în curând.</div>
        )}

        <div className="mm-top-bar">
          <span className="mm-count">
            {!loading && `${mesaje.length} ${mesaje.length === 1 ? 'mesaj' : 'mesaje'}`}
          </span>
          <button
            className={`mm-btn-nou ${showForm ? 'activ' : ''}`}
            onClick={() => { setShowForm(v => !v); setStare(null) }}
          >
            {showForm ? '✕ Anulează' : '+ Mesaj nou'}
          </button>
        </div>

        {showForm && (
          <div className="mm-form-panel">
            <h3>Scrie-ne o întrebare</h3>
            <p>Răspundem în maxim 24 de ore</p>
            <form onSubmit={handleTrimite}>
              <textarea
                placeholder="Descrie întrebarea sau cererea ta..."
                rows={4}
                value={intrebare}
                onChange={e => setIntrebare(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" disabled={trimitand || !intrebare.trim()}>
                {trimitand ? 'Se trimite...' : 'Trimite mesajul'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="mm-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : mesaje.length === 0 && !showForm ? (
          <div className="mm-gol">
            <div className="mm-gol-icon">✉</div>
            <h3>Nicio conversație încă</h3>
            <p>Ai o întrebare pentru noi? Scrie-ne și îți răspundem în maxim 24 de ore.</p>
            <button className="mm-btn-start" onClick={() => setShowForm(true)}>
              Scrie primul mesaj
            </button>
          </div>
        ) : (
          <div className="mm-lista">
            {mesaje.map(m => (
              <div
                key={m.id}
                className={`mm-card ${m.raspuns ? 'raspuns' : 'asteptare'} ${expandat === m.id ? 'expandat' : ''}`}
                onClick={() => handleExpandat(m)}
              >
                <div className="mm-card-header">
                  <div className="mm-card-meta">
                    <span className={`mm-status-dot ${m.raspuns ? 'verde' : 'galben'}`} />
                    <span className="mm-card-preview">
                      {m.intrebare.length > 60 && expandat !== m.id
                        ? m.intrebare.slice(0, 60) + '...'
                        : m.intrebare}
                    </span>
                  </div>
                  <div className="mm-card-right">
                    <span className={`mm-status-label ${m.raspuns ? 'verde' : 'galben'}`}>
                      {m.raspuns ? 'Răspuns primit' : 'În așteptare'}
                    </span>
                    <span className="mm-card-data">{formatData(m.createdAt)}</span>
                    <span className="mm-chevron">{expandat === m.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expandat === m.id && (
                  <div className="mm-card-body">
                    <div className="mm-bloc intrebare">
                      <div className="mm-bloc-label">Întrebarea ta</div>
                      <p>{m.intrebare}</p>
                    </div>
                    {m.raspuns ? (
                      <div className="mm-bloc raspuns-bloc">
                        <div className="mm-bloc-label">Răspuns de la restaurant</div>
                        <p>{m.raspuns}</p>
                        <span className="mm-raspuns-data">{formatData(m.raspunsAt)}</span>
                      </div>
                    ) : (
                      <div className="mm-asteptare-info">
                        Mesajul tău a fost primit. Îți vom răspunde în curând.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MesajeleMele
