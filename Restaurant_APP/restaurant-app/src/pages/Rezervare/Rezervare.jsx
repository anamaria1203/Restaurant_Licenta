import './Rezervare.css'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { creeazaRezervare } from '../../services/api'

const userLogat = (() => {
  try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
})()

const ZONE_INFO = {
  retras: {
    label: 'Colț Retras',
    descriere: 'Masă intimă, departe de agitație. Perfectă pentru momente private.'
  },
  fereastra: {
    label: 'Lângă Fereastră',
    descriere: 'Lumină naturală, vedere plăcută. Atmosferă relaxantă și elegantă.'
  },
  terasa: {
    label: 'Terasă',
    descriere: 'Sub cerul liber, aer proaspăt. Ideală pentru serile de vară.'
  },
  central: {
    label: 'Central',
    descriere: 'În inima restaurantului, atmosferă animată și socială.'
  },
  vip: {
    label: 'Salon VIP',
    descriere: 'Salon privat, discreție maximă. Pentru ocazii deosebite.'
  }
}

const ORA_OPTIONS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]


function recomandaZona(nrPersoane, ocazie, atmosfera, locatie) {
  if (locatie === 'exterior') return 'terasa'
  if (ocazie === 'aniversare' || ocazie === 'vip') return 'vip'
  if (ocazie === 'romantic') return 'retras'
  if (ocazie === 'afaceri') return 'fereastra'
  if (atmosfera === 'linistit') return nrPersoane <= 2 ? 'retras' : 'fereastra'
  if (nrPersoane >= 6) return 'central'
  if (atmosfera === 'animat') return 'central'
  return 'fereastra'
}

const GatePage = () => (
  <div className="rezervare-page">
    <Navbar />
    <div className="rez-gate-overlay">
      <div className="rez-gate-card">
        <h2>Rezervă o masă</h2>
        <p>Conectează-te pentru a face o rezervare la Villa Ana Ristorante.</p>
        <div className="rez-gate-buttons">
          <a href="/login?mod=login" className="rez-gate-btn-primary">Conectează-te</a>
          <a href="/login?mod=register" className="rez-gate-btn-secondary">Creează cont</a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

const SuccesPage = ({ rezervare }) => (
  <div className="rezervare-page">
    <Navbar />
    <div className="rez-succes-overlay">
      <div className="rez-succes-card">
        <div className="rez-succes-icon">✓</div>
        <h2>Rezervare trimisă!</h2>
        <p>Rezervarea ta este <strong>în așteptarea confirmării</strong> din partea restaurantului.</p>
        <div className="rez-succes-detalii">
          <div className="rez-succes-row">
            <span>Data</span>
            <strong>{new Date(rezervare.reservationDate + 'T12:00:00').toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </div>
          <div className="rez-succes-row">
            <span>Ora</span>
            <strong>{rezervare.hour}</strong>
          </div>
          <div className="rez-succes-row">
            <span>Persoane</span>
            <strong>{rezervare.guestCount}</strong>
          </div>
          <div className="rez-succes-row">
            <span>Zona</span>
            <strong>{ZONE_INFO[rezervare.zone]?.label}</strong>
          </div>
        </div>
        <div className="rez-succes-actions">
          <a href="/rezervarile-mele" className="rez-succes-btn-primary">Rezervările mele</a>
          <a href="/" className="rez-succes-btn-secondary">Pagina principală</a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

const Rezervare = () => {
  const [pas, setPas] = useState(1)
  const [nrPersoane, setNrPersoane] = useState(2)
  const [ocazie, setOcazie] = useState('casual')
  const [atmosfera, setAtmosfera] = useState('linistit')
  const [locatie, setLocatie] = useState('interior')
  const [zonaRecomandata, setZonaRecomandata] = useState(null)
  const [zonaAleasa, setZonaAleasa] = useState(null)
  const [data, setData] = useState('')
  const [ora, setOra] = useState('19:00')
  const [observatii, setObservatii] = useState('')
  const [eroare, setEroare] = useState('')
  const [trimitand, setTrimitand] = useState(false)
  const [rezervareFinala, setRezervareFinala] = useState(null)

  if (!userLogat) return <GatePage />

  const handleCalculeazaZona = () => {
    const rec = recomandaZona(nrPersoane, ocazie, atmosfera, locatie)
    setZonaRecomandata(rec)
    setZonaAleasa(rec)
    setPas(2)
  }

  const handleTrimite = async () => {
    if (!data) { setEroare('Te rugăm să selectezi o dată.'); return }
    if (!zonaAleasa) { setEroare('Te rugăm să confirmi zona.'); return }

    const azi = new Date()
    azi.setHours(0, 0, 0, 0)
    const dataAleasa = new Date(data)
    if (dataAleasa <= azi) { setEroare('Data rezervării trebuie să fie în viitor.'); return }

    setEroare('')
    setTrimitand(true)
    try {
      const response = await creeazaRezervare({
        data,
        ora,
        nrPersoane,
        zona: zonaAleasa,
        ocazie: ocazie !== 'casual' ? ocazie : null,
        observatii: observatii || null
      })
      const json = await response.json()
      if (response.ok) {
        setRezervareFinala(json)
      } else {
        setEroare(json.error || 'Eroare la trimiterea rezervării.')
      }
    } catch {
      setEroare('Eroare de conexiune cu serverul.')
    } finally {
      setTrimitand(false)
    }
  }

  if (rezervareFinala) return <SuccesPage rezervare={rezervareFinala} />

  const azi = new Date()
  const minData = new Date(azi)
  minData.setDate(minData.getDate() + 1)
  const minDataStr = minData.toISOString().split('T')[0]

  const maxData = new Date(azi)
  maxData.setMonth(maxData.getMonth() + 3)
  const maxDataStr = maxData.toISOString().split('T')[0]

  return (
    <div className="rezervare-page">
      <Navbar />

      <div className="rez-hero">
        <div className="rez-hero-content">
          <div className="rez-tag">Rezervă o masă</div>
          <h1>Alege experiența perfectă</h1>
          <p>Răspunde la câteva întrebări și îți recomandăm zona ideală</p>
        </div>
      </div>

      <div className="rez-body">
        <div className="rez-pasi">
          <div className={`rez-pas-indicator ${pas >= 1 ? 'activ' : ''}`}>
            <span>1</span> Preferințe
          </div>
          <div className="rez-pas-linie" />
          <div className={`rez-pas-indicator ${pas >= 2 ? 'activ' : ''}`}>
            <span>2</span> Zona & Detalii
          </div>
        </div>

        {pas === 1 && (
          <div className="rez-card">
            <h2 className="rez-card-title">Spune-ne ce îți dorești</h2>

            <div className="rez-grup">
              <label className="rez-label">Câte persoane?</label>
              <div className="rez-nr-persoane">
                <button className="rez-nr-btn" onClick={() => setNrPersoane(p => Math.max(1, p - 1))}>−</button>
                <span className="rez-nr-val">{nrPersoane}</span>
                <button className="rez-nr-btn" onClick={() => setNrPersoane(p => Math.min(20, p + 1))}>+</button>
              </div>
            </div>

            <div className="rez-grup">
              <label className="rez-label">Cu ce ocazie?</label>
              <div className="rez-optiuni">
                {[
                  { val: 'casual', label: 'Simplu / Casual' },
                  { val: 'romantic', label: 'Romantic' },
                  { val: 'aniversare', label: 'Aniversare' },
                  { val: 'afaceri', label: 'Întâlnire de afaceri' },
                  { val: 'vip', label: 'Ocazie specială VIP' }
                ].map(o => (
                  <button
                    key={o.val}
                    className={`rez-opt-btn ${ocazie === o.val ? 'activ' : ''}`}
                    onClick={() => setOcazie(o.val)}
                  >{o.label}</button>
                ))}
              </div>
            </div>

            <div className="rez-grup">
              <label className="rez-label">Preferi atmosferă...</label>
              <div className="rez-optiuni">
                <button
                  className={`rez-opt-btn ${atmosfera === 'linistit' ? 'activ' : ''}`}
                  onClick={() => setAtmosfera('linistit')}
                >Liniștită și intimă</button>
                <button
                  className={`rez-opt-btn ${atmosfera === 'animat' ? 'activ' : ''}`}
                  onClick={() => setAtmosfera('animat')}
                >Animată și socială</button>
              </div>
            </div>

            <div className="rez-grup">
              <label className="rez-label">Interior sau exterior?</label>
              <div className="rez-optiuni">
                <button
                  className={`rez-opt-btn ${locatie === 'interior' ? 'activ' : ''}`}
                  onClick={() => setLocatie('interior')}
                >Interior</button>
                <button
                  className={`rez-opt-btn ${locatie === 'exterior' ? 'activ' : ''}`}
                  onClick={() => setLocatie('exterior')}
                >Terasă / Exterior</button>
              </div>
            </div>

            <button className="rez-btn-principal" onClick={handleCalculeazaZona}>
              Vezi zona recomandată →
            </button>
          </div>
        )}

        {pas === 2 && (
          <div className="rez-card">
            <div className="rez-recomandata-banner">
              <div className="rez-rec-label">Zona recomandată pentru tine</div>
              <div className="rez-rec-zona">
                <div>
                  <div className="rez-rec-nume">{ZONE_INFO[zonaRecomandata]?.label}</div>
                  <div className="rez-rec-desc">{ZONE_INFO[zonaRecomandata]?.descriere}</div>
                </div>
              </div>
            </div>

            <div className="rez-grup">
              <label className="rez-label">Confirmă sau schimbă zona</label>
              <div className="rez-zone-grid">
                {Object.entries(ZONE_INFO).map(([key, info]) => (
                  <button
                    key={key}
                    className={`rez-zona-card ${zonaAleasa === key ? 'activ' : ''} ${zonaRecomandata === key ? 'recomandata' : ''}`}
                    onClick={() => setZonaAleasa(key)}
                  >
                    <span className="rez-zona-label">{info.label}</span>
                    {zonaRecomandata === key && <span className="rez-zona-badge">Recomandat</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="rez-doua-coloane">
              <div className="rez-grup">
                <label className="rez-label">Data rezervării</label>
                <input
                  type="date"
                  className="rez-input"
                  value={data}
                  min={minDataStr}
                  max={maxDataStr}
                  onChange={e => setData(e.target.value)}
                />
              </div>
              <div className="rez-grup">
                <label className="rez-label">Ora</label>
                <select className="rez-input" value={ora} onChange={e => setOra(e.target.value)}>
                  {ORA_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="rez-grup">
              <label className="rez-label">Observații (opțional)</label>
              <textarea
                className="rez-textarea"
                placeholder="Ex: loc lângă perete, alergii alimentare, etc."
                value={observatii}
                onChange={e => setObservatii(e.target.value)}
                rows={3}
              />
            </div>

            {eroare && <div className="rez-eroare">⚠ {eroare}</div>}

            <div className="rez-actiuni">
              <button className="rez-btn-secundar" onClick={() => setPas(1)}>← Înapoi</button>
              <button className="rez-btn-principal" onClick={handleTrimite} disabled={trimitand}>
                {trimitand ? 'Se trimite...' : 'Confirmă rezervarea'}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Rezervare
