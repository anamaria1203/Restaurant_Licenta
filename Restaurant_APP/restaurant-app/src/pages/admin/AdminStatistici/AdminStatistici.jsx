import './AdminStatistici.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStatisticiComenzi } from '../../../services/api'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
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
        <p className="stat-tooltip-val">{payload[0].value} rezervări</p>
      </div>
    )
  }
  return null
}

const calcAngajati = (nrRez, totalPrep) => {
  if (nrRez === 0) return 1
  let baza
  if (nrRez <= 2)       baza = 2
  else if (nrRez <= 5)  baza = 4
  else if (nrRez <= 9)  baza = 7
  else if (nrRez <= 14) baza = 10
  else if (nrRez <= 20) baza = 13
  else                  baza = 15
  const prepPerRez = totalPrep / nrRez
  if (prepPerRez >= 5)      baza += 2
  else if (prepPerRez >= 3) baza += 1
  return baza
}

const calcNivel = (nrRez) => {
  if (nrRez === 0) return { label: 'Fără activitate', cls: 'zero'  }
  if (nrRez <= 3)  return { label: 'Redus',           cls: 'mic'   }
  if (nrRez <= 8)  return { label: 'Moderat',         cls: 'mediu' }
  if (nrRez <= 15) return { label: 'Ridicat',         cls: 'mare'  }
  return                  { label: 'Aglomerat',        cls: 'varf'  }
}

const AdminStatistici = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [override, setOverride] = useState({})
  const [editingOra, setEditingOra] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    getStatisticiComenzi()
      .then(data => setDate(data))
      .catch(() => setDate(null))
      .finally(() => setLoading(false))
  }, [navigate])

  const oraVarf = date?.peOre?.reduce((max, r) => r.nrRezervari > max.nrRezervari ? r : max, { ora: '-', nrRezervari: 0 })
  const ziuaVarf = date?.peZile?.reduce((max, r) => r.nrRezervari > max.nrRezervari ? r : max, { ziua: '-', nrRezervari: 0 })
  const totalRezervari = date?.peOre?.reduce((s, r) => s + r.nrRezervari, 0) || 0

  return (
    <div className="stat-page">
      <AdminNavbar title="Statistici" />

      <div className="stat-content">
        <div className="stat-header">
          <h1>Analiza Activității</h1>
          <p>Statistici bazate pe rezervările cu comandă pre-asociată</p>
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
                <div className="stat-card-val">{totalRezervari}</div>
                <div className="stat-card-label">Rezervări cu comandă</div>
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
                <h2>Rezervări cu comandă pe ore</h2>
                <p>Distribuția rezervărilor cu pre-comandă în funcție de ora rezervării</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={date.peOre} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="ora" tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(201,168,76,0.06)' }} />
                  <Bar dataKey="nrRezervari" radius={[3, 3, 0, 0]}>
                    {date.peOre.map((entry, index) => (
                      <Cell key={index} fill={entry.ora === oraVarf.ora ? CULOARE_PRIMARA : CULOARE_SECUNDARA} opacity={entry.nrRezervari === 0 ? 0.25 : 1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="stat-grafic-bloc">
              <div className="stat-grafic-titlu">
                <h2>Rezervări cu comandă pe zile ale săptămânii</h2>
                <p>Distribuția rezervărilor cu pre-comandă în funcție de ziua săptămânii</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={date.peZile} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="ziua" tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(201,168,76,0.06)' }} />
                  <Bar dataKey="nrRezervari" radius={[3, 3, 0, 0]}>
                    {date.peZile.map((entry, index) => (
                      <Cell key={index} fill={entry.ziua === ziuaVarf.ziua ? CULOARE_PRIMARA : CULOARE_SECUNDARA} opacity={entry.nrRezervari === 0 ? 0.25 : 1} />
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
                    <th>Rezervări</th>
                    <th>Preparate pre-comandate</th>
                    <th>Angajați recomandați</th>
                    <th>Nivel trafic</th>
                  </tr>
                </thead>
                <tbody>
                  {date.peOre
                    .filter(r => parseInt(r.ora) >= 9 && parseInt(r.ora) <= 23)
                    .map(r => {
                      const angajatiRec = calcAngajati(r.nrRezervari, r.totalPreparate || 0)
                      const angajati = override[r.ora] ?? angajatiRec
                      const nivel = calcNivel(r.nrRezervari)
                      return (
                        <tr key={r.ora}>
                          <td className="shift-ora">{r.ora}</td>
                          <td>{r.nrRezervari}</td>
                          <td>{r.totalPreparate || 0}</td>
                          <td
                            className={`shift-ang${override[r.ora] !== undefined ? ' ang-editata' : ''}`}
                            onClick={() => setEditingOra(r.ora)}
                            title="Click pentru modificare manuală"
                          >
                            {editingOra === r.ora ? (
                              <input
                                className="shift-ang-input"
                                type="number"
                                min="0"
                                max="50"
                                defaultValue={angajati}
                                autoFocus
                                onBlur={e => {
                                  const val = parseInt(e.target.value)
                                  if (!isNaN(val) && val >= 0) setOverride(prev => ({ ...prev, [r.ora]: val }))
                                  setEditingOra(null)
                                }}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') e.target.blur()
                                  if (e.key === 'Escape') setEditingOra(null)
                                }}
                              />
                            ) : angajati}
                          </td>
                          <td><span className={`shift-nivel shift-nivel-${nivel.cls}`}>{nivel.label}</span></td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminStatistici
