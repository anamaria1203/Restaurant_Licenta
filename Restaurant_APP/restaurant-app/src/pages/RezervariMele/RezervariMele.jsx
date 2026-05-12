import './RezervariMele.css'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getRezervariMele, anuleazaRezervare, getComenziMele } from '../../services/api'

const STATUS_CULORI = {
  in_asteptare: 'status-asteptare',
  confirmata: 'status-confirmata',
  anulata: 'status-anulata'
}

const STATUS_COM = {
  in_asteptare: { label: 'În așteptare', cls: 'status-asteptare' },
  confirmata:   { label: 'Confirmată',   cls: 'status-confirmata' },
  in_preparare: { label: 'În preparare', cls: 'status-preparare' },
  livrata:      { label: 'Livrată',      cls: 'status-livrata' },
  anulata:      { label: 'Anulată',      cls: 'status-anulata' }
}

const STATUS_LABEL = {
  in_asteptare: 'În așteptare',
  confirmata: 'Confirmată',
  anulata: 'Anulată'
}

const ZONA_INFO = {
  retras: { label: 'Colț Retras' },
  fereastra: { label: 'Lângă Fereastră' },
  terasa: { label: 'Terasă' },
  central: { label: 'Central' },
  vip: { label: 'Salon VIP' }
}

const OCAZIE_LABEL = {
  romantic: 'Romantic',
  aniversare: 'Aniversare',
  afaceri: 'Afaceri',
  vip: 'Ocazie specială'
}

const RezervariMele = () => {
  const userLogat = (() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })()

  const [rezervari, setRezervari] = useState([])
  const [comenzi, setComenzi] = useState([])
  const [loading, setLoading] = useState(true)
  const [anulandId, setAnulandId] = useState(null)
  const [confirmareId, setConfirmareId] = useState(null)
  const [showAnulate, setShowAnulate] = useState(false)
  const [eroare, setEroare] = useState('')

  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') {
      window.location.href = '/login?mod=login'
      return
    }
    Promise.all([getRezervariMele(), getComenziMele()])
      .then(([rez, com]) => { setRezervari(rez); setComenzi(com) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAnuleaza = async (id) => {
    setAnulandId(id)
    setEroare('')
    try {
      const response = await anuleazaRezervare(id)
      const data = await response.json()
      if (response.ok) {
        setRezervari(prev => prev.map(r => r.id === id ? data : r))
      } else {
        setEroare(data.error || 'Eroare la anulare')
      }
    } catch {
      setEroare('Eroare de conexiune cu serverul')
    } finally {
      setAnulandId(null)
    }
  }

  return (
    <div className="rezme-page">
      <Navbar />

      <div className="rezme-hero">
        <div className="rezme-hero-content">
          <div className="rezme-tag">Contul meu</div>
          <h1>Rezervările Mele</h1>
          <p>Istoricul și statusul rezervărilor tale</p>
        </div>
      </div>

      <div className="rezme-body">
        {loading ? (
          <div className="meniu-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : rezervari.length === 0 ? (
          <div className="rezme-goale">
            <h3>Nu ai nicio rezervare încă</h3>
            <p>Rezervă o masă și bucură-te de o experiență deosebită!</p>
            <a href="/rezervare" className="rezme-btn-rezerva">Rezervă acum</a>
          </div>
        ) : (
          <div className="rezme-container">
            {eroare && <div className="rezme-eroare">⚠ {eroare}</div>}

            {(() => {
              const active = rezervari.filter(r => r.status !== 'anulata')
              const anulate = rezervari.filter(r => r.status === 'anulata')

              const RandRezervare = ({ r }) => {
                const comandaAsociata = comenzi.find(c => c.rezervareId === r.id)
                return (
                <div key={r.id} className="rezme-sectiune">
                  <div className="rezme-header">
                    <div className="rezme-stanga">
                      <div className="rezme-nr">Rezervare #{r.id}</div>
                      <div className="rezme-data-creare">
                        Plasată pe {new Date(r.createdAt).toLocaleDateString('ro-RO', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="rezme-dreapta">
                      <span className={`rezme-status ${STATUS_CULORI[r.status]}`}>
                        {STATUS_LABEL[r.status]}
                      </span>
                      {r.status === 'confirmata' && (
                        <a href="/comanda" className="rezme-btn-comanda">Comandă acum</a>
                      )}
                      {r.status === 'in_asteptare' && (
                        <div className="rezme-anulare-wrapper">
                          <button
                            className="rezme-btn-anuleaza"
                            onClick={() => setConfirmareId(confirmareId === r.id ? null : r.id)}
                            disabled={anulandId === r.id}
                          >
                            {anulandId === r.id ? '...' : 'Anulează'}
                          </button>
                          {confirmareId === r.id && (
                            <div className="rezme-confirmare-dropdown">
                              <p>Ești sigur că vrei să anulezi rezervarea?</p>
                              <div className="rezme-confirmare-butoane">
                                <button className="rezme-btn-da" onClick={() => { setConfirmareId(null); handleAnuleaza(r.id) }}>Da</button>
                                <button className="rezme-btn-nu" onClick={() => setConfirmareId(null)}>Nu</button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rezme-detalii">
                    <div className="rezme-detaliu-item">
                      <div>
                        <div className="rezme-detaliu-label">Data & Ora</div>
                        <div className="rezme-detaliu-val">
                          {new Date(r.data + 'T12:00:00').toLocaleDateString('ro-RO', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                          })}, {r.ora}
                        </div>
                      </div>
                    </div>
                    <div className="rezme-detaliu-item">
                      <div>
                        <div className="rezme-detaliu-label">Persoane</div>
                        <div className="rezme-detaliu-val">{r.nrPersoane} {r.nrPersoane === 1 ? 'persoană' : 'persoane'}</div>
                      </div>
                    </div>
                    <div className="rezme-detaliu-item">
                      <div>
                        <div className="rezme-detaliu-label">Zona</div>
                        <div className="rezme-detaliu-val">{ZONA_INFO[r.zona]?.label}</div>
                      </div>
                    </div>
                    {r.ocazie && (
                      <div className="rezme-detaliu-item">
                        <div>
                          <div className="rezme-detaliu-label">Ocazie</div>
                          <div className="rezme-detaliu-val">{OCAZIE_LABEL[r.ocazie] || r.ocazie}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {r.observatii && (
                    <div className="rezme-observatii">Observații: {r.observatii}</div>
                  )}

                  {comandaAsociata && (
                    <div className="rezme-comanda-asociata">
                      <div className="rezme-comanda-titlu">
                        <span>Comandă pre-comandată</span>
                        <span className={`rezme-status ${STATUS_COM[comandaAsociata.status]?.cls}`}>
                          {STATUS_COM[comandaAsociata.status]?.label}
                        </span>
                      </div>
                      <div className="rezme-comanda-items">
                        {comandaAsociata.ComandaItems?.map(item => (
                          <div key={item.id} className="rezme-comanda-item">
                            <span className="rezme-ci-nume">{item.numeSnapshot}</span>
                            <span className="rezme-ci-cant">× {item.cantitate}</span>
                            <span className="rezme-ci-pret">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</span>
                          </div>
                        ))}
                      </div>
                      <div className="rezme-comanda-total">
                        Total: {Number(comandaAsociata.total).toFixed(2)} RON
                      </div>
                    </div>
                  )}
                </div>
              )
              }

              return (
                <>
                  {active.length === 0 ? (
                    <div className="rezme-goale-inline">
                      <p>Nu ai rezervări active în acest moment.</p>
                      <a href="/rezervare" className="rezme-btn-rezerva">Rezervă acum</a>
                    </div>
                  ) : (
                    active.map(r => <RandRezervare key={r.id} r={r} />)
                  )}

                  {anulate.length > 0 && (
                    <div className="rezme-anulate-sectiune">
                      <div className="rezme-anulate-header" onClick={() => setShowAnulate(!showAnulate)}>
                        <span>Rezervări anulate ({anulate.length})</span>
                        <span className="rezme-toggle">{showAnulate ? '▲' : '▼'}</span>
                      </div>
                      {showAnulate && anulate.map(r => <RandRezervare key={r.id} r={r} />)}
                    </div>
                  )}

                  <div className="rezme-footer-bar">
                    <span>{active.length} {active.length === 1 ? 'rezervare activă' : 'rezervări active'}</span>
                    <a href="/rezervare" className="rezme-btn-noua">+ Rezervare nouă</a>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default RezervariMele
