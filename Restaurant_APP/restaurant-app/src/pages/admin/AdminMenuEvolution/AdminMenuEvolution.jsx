import './AdminMenuEvolution.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMenuEvolution, toggleDisponibil } from '../../../services/api'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'

const getStatus = (p) => {
  if (p.totalUltimele30Zile >= 10) return { label: 'Popular',                cls: 'popular'  }
  if (p.totalUltimele30Zile >= 3)  return { label: 'Normal',                 cls: 'normal'   }
  if (p.totalUltimele30Zile >= 1)  return { label: 'Slab',                   cls: 'slab'     }
  if (p.ultimaComanda)             return { label: 'Fără vânzări (30 zile)', cls: 'stagnant' }
  return                                  { label: 'Niciodată comandat',      cls: 'nou'      }
}

const daysSince = (dateStr) => {
  if (!dateStr) return null
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000)
}

const FILTRE = [
  { key: 'toate',        label: 'Toate'          },
  { key: 'popular',      label: 'Popular'        },
  { key: 'normal',       label: 'Normal'         },
  { key: 'slab',         label: 'Slab'           },
  { key: 'fara_vanzari', label: 'Fără vânzări'   },
]

const AdminMenuEvolution = () => {
  const navigate = useNavigate()
  const [preparate, setPreparate] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtru, setFiltru] = useState('toate')
  const [procesand, setProcesand] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.tip !== 'manager') { navigate('/'); return }
    getMenuEvolution()
      .then(data => setPreparate(Array.isArray(data) ? data : []))
      .catch(() => setPreparate([]))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleToggle = async (id) => {
    setProcesand(id)
    try {
      const result = await toggleDisponibil(id)
      setPreparate(prev => prev.map(p => p.id === id ? { ...p, disponibil: result.disponibil } : p))
    } finally {
      setProcesand(null)
    }
  }

  const preparateFiltrate = preparate.filter(p => {
    if (filtru === 'popular')      return p.totalUltimele30Zile >= 10
    if (filtru === 'normal')       return p.totalUltimele30Zile >= 3 && p.totalUltimele30Zile < 10
    if (filtru === 'slab')         return p.totalUltimele30Zile >= 1 && p.totalUltimele30Zile < 3
    if (filtru === 'fara_vanzari') return p.totalUltimele30Zile === 0
    return true
  })

  const grouped = preparateFiltrate.reduce((acc, p) => {
    const cat = p.categorie || 'altele'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  return (
    <div className="mevo-page">
      <AdminNavbar title="Menu Evolution" />

      <div className="mevo-content">
        <div className="mevo-header">
          <h1>Menu Evolution</h1>
          <p>Performanța preparatelor în ultimele 30 de zile — identifică ce merge bine și ce ar trebui revizuit</p>
        </div>

        <div className="mevo-filtre">
          {FILTRE.map(f => (
            <button
              key={f.key}
              className={`mevo-filtru-btn${filtru === f.key ? ' activ' : ''}`}
              onClick={() => setFiltru(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mevo-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă datele...</p>
          </div>
        ) : preparateFiltrate.length === 0 ? (
          <div className="mevo-gol"><p>Nu există preparate pentru filtrul selectat.</p></div>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mevo-categorie">
              <div className="mevo-cat-titlu">{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
              <div className="mevo-grid">
                {items.map(p => {
                  const status = getStatus(p)
                  const zile = daysSince(p.ultimaComanda)
                  const avertisment = p.totalUltimele30Zile === 0 && p.ultimaComanda !== null
                  return (
                    <div key={p.id} className={`mevo-card${avertisment ? ' cu-avertisment' : ''}${!p.disponibil ? ' indisponibil' : ''}`}>
                      {p.imagine && (
                        <div className="mevo-card-img">
                          <img src={`/images/meniu/${p.imagine}`} alt={p.nume} onError={e => { e.target.style.display = 'none' }} />
                          {!p.disponibil && <div className="mevo-card-img-overlay">Indisponibil</div>}
                        </div>
                      )}
                      <div className="mevo-card-body">
                        <div className="mevo-card-top">
                          <span className="mevo-card-nume">{p.nume}</span>
                          <span className={`mevo-badge ${status.cls}`}>{status.label}</span>
                        </div>
                        {p.subcategorie && <span className="mevo-card-sub">{p.subcategorie}</span>}
                        <div className="mevo-card-stats">
                          <span className="mevo-stat-val">{p.totalUltimele30Zile}</span>
                          <span className="mevo-stat-label">vândute (30 zile)</span>
                        </div>
                        {zile !== null && (
                          <div className="mevo-card-ultima">
                            Ultima comandă: <strong>{zile === 0 ? 'astăzi' : `acum ${zile} zile`}</strong>
                          </div>
                        )}
                        {avertisment && (
                          <div className="mevo-avertisment">⚠ Consideră înlocuirea</div>
                        )}
                        <button
                          className={`mevo-toggle-btn ${p.disponibil ? 'dezactiveaza' : 'activeaza'}`}
                          onClick={() => handleToggle(p.id)}
                          disabled={procesand === p.id}
                        >
                          {procesand === p.id ? '...' : p.disponibil ? 'Dezactivează' : 'Activează'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminMenuEvolution
