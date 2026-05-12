import './AdminStatistici.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStatisticiComenzi } from '../../../services/api'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const CULOARE_PRIMARA = '#c9a84c'
const CULOARE_SECUNDARA = '#7a5c28'

const TooltipCustom = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="stat-tooltip">
        <p className="stat-tooltip-label">{label}</p>
        <p className="stat-tooltip-val">{payload[0].value} comenzi</p>
      </div>
    )
  }
  return null
}

const AdminStatistici = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    getStatisticiComenzi()
      .then(data => setDate(data))
      .catch(() => setDate(null))
      .finally(() => setLoading(false))
  }, [navigate])

  const oraVarf = date?.peOre?.reduce((max, r) => r.nrComenzi > max.nrComenzi ? r : max, { ora: '-', nrComenzi: 0 })
  const ziuaVarf = date?.peZile?.reduce((max, r) => r.nrComenzi > max.nrComenzi ? r : max, { ziua: '-', nrComenzi: 0 })
  const totalComenzi = date?.peOre?.reduce((s, r) => s + r.nrComenzi, 0) || 0

  return (
    <div className="stat-page">
      <div className="stat-navbar">
        <div className="stat-logo">Villa Ana Ristorante</div>
        <div className="stat-navbar-center">Statistici</div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="stat-btn-nav" onClick={() => navigate('/admin-menu-evolution')}>
            Menu Evolution
          </button>
          <button className="stat-btn-nav" onClick={() => navigate('/admin-activitate')}>
            Comenzi &amp; Rezervări
          </button>
          <button className="stat-btn-nav" onClick={() => navigate('/admin-dashboard')}>
            ← Dashboard
          </button>
        </div>
      </div>

      <div className="stat-content">
        <div className="stat-header">
          <h1>Analiza Activității</h1>
          <p>Vizualizează orele și zilele cu cel mai mare trafic pentru a optimiza programul angajaților</p>
        </div>

        {loading ? (
          <div className="stat-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă datele...</p>
          </div>
        ) : !date ? (
          <div className="stat-eroare">Nu s-au putut încărca datele.</div>
        ) : (
          <>
            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-card-val">{totalComenzi}</div>
                <div className="stat-card-label">Total comenzi</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-val">{oraVarf.ora}</div>
                <div className="stat-card-label">Ora de vârf</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-val">{ziuaVarf.ziua}</div>
                <div className="stat-card-label">Ziua cu cel mai mult trafic</div>
              </div>
            </div>

            <div className="stat-grafic-bloc">
              <div className="stat-grafic-titlu">
                <h2>Comenzi pe ore</h2>
                <p>Distribuția comenzilor în funcție de ora din zi</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={date.peOre} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="ora"
                    tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(201,168,76,0.06)' }} />
                  <Bar dataKey="nrComenzi" radius={[3, 3, 0, 0]}>
                    {date.peOre.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.ora === oraVarf.ora ? CULOARE_PRIMARA : CULOARE_SECUNDARA}
                        opacity={entry.nrComenzi === 0 ? 0.25 : 1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="stat-grafic-bloc">
              <div className="stat-grafic-titlu">
                <h2>Comenzi pe zile ale săptămânii</h2>
                <p>Distribuția comenzilor în funcție de ziua săptămânii</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={date.peZile} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="ziua"
                    tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(201,168,76,0.06)' }} />
                  <Bar dataKey="nrComenzi" radius={[3, 3, 0, 0]}>
                    {date.peZile.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.ziua === ziuaVarf.ziua ? CULOARE_PRIMARA : CULOARE_SECUNDARA}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="stat-grafic-bloc">
              <div className="stat-grafic-titlu">
                <h2>ShiftOptimizer — Recomandări Ture</h2>
              </div>
              <table className="stat-shift-table">
                <thead>
                  <tr>
                    <th>Ora</th>
                    <th>Comenzi</th>
                    <th>Angajați recomandați</th>
                    <th>Nivel trafic</th>
                  </tr>
                </thead>
                <tbody>
                  {date.peOre
                    .filter(r => parseInt(r.ora) >= 9 && parseInt(r.ora) <= 23)
                    .map(r => {
                      const angajati = r.nrComenzi === 0 ? 1 : Math.max(1, Math.ceil(r.nrComenzi / 3))
                      const nivel =
                        r.nrComenzi === 0 ? { label: 'Fără activitate', cls: 'zero'  } :
                        r.nrComenzi <= 3  ? { label: 'Redus',           cls: 'mic'   } :
                        r.nrComenzi <= 7  ? { label: 'Moderat',         cls: 'mediu' } :
                                            { label: 'Ridicat',         cls: 'mare'  }
                      return (
                        <tr key={r.ora}>
                          <td className="shift-ora">{r.ora}</td>
                          <td>{r.nrComenzi}</td>
                          <td className="shift-ang">{angajati}</td>
                          <td><span className={`shift-nivel shift-nivel-${nivel.cls}`}>{nivel.label}</span></td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <p className="stat-shift-nota">Formulă: max(1, ⌈nr. comenzi ÷ 3⌉) angajați per tură de o oră</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminStatistici
