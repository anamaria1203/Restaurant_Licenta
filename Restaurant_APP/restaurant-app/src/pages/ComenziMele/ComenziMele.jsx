import './ComenziMele.css'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getComenziMele, updateComandaItems, getMeniu } from '../../services/api'

const STATUS_CULORI = {
  'in_asteptare': 'status-asteptare',
  'confirmata': 'status-confirmata',
  'in_preparare': 'status-preparare',
  'livrata': 'status-livrata',
  'anulata': 'status-anulata'
}

const STATUS_LABEL = {
  'in_asteptare': 'În așteptare',
  'confirmata': 'Confirmată',
  'in_preparare': 'În preparare',
  'livrata': 'Livrată',
  'anulata': 'Anulată'
}

const CATEGORII = ['Aperitive', 'Supe', 'Carne', 'Pește', 'Paste & Risotto', 'Deserturi', 'Bauturi']

const ComenziMele = () => {
  const userLogat = (() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })()

  const [comenzi, setComenzi] = useState([])
  const [loading, setLoading] = useState(true)
  const [editandId, setEditandId] = useState(null)
  const [itemsEdit, setItemsEdit] = useState([])
  const [categorieAdd, setCategorieAdd] = useState('Aperitive')
  const [preparateAdd, setPreparateAdd] = useState([])
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [salvand, setSalvand] = useState(false)
  const [eroareEdit, setEroareEdit] = useState('')

  useEffect(() => {
    if (!userLogat || userLogat.tip !== 'client') {
      window.location.href = '/login?mod=login'
      return
    }
    getComenziMele()
      .then(data => setComenzi(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleStartEdit = (comanda) => {
    setEditandId(comanda.id)
    setEroareEdit('')
    setItemsEdit(comanda.ComandaItems.map(item => ({
      preparatId: item.preparatId,
      numeSnapshot: item.numeSnapshot,
      pretSnapshot: item.pretSnapshot,
      cantitate: item.cantitate
    })))
    setCategorieAdd('Aperitive')
    fetchPreparateAdd('Aperitive')
  }

  const handleAnuleazaEdit = () => {
    setEditandId(null)
    setItemsEdit([])
    setPreparateAdd([])
    setEroareEdit('')
  }

  const fetchPreparateAdd = async (categorie) => {
    setLoadingAdd(true)
    try {
      const data = await getMeniu(categorie, null)
      setPreparateAdd(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingAdd(false)
    }
  }

  const handleCategorieAdd = (cat) => {
    setCategorieAdd(cat)
    fetchPreparateAdd(cat)
  }

  const adaugaInEdit = (preparat) => {
    setItemsEdit(prev => {
      const existent = prev.find(i => i.preparatId === preparat.id)
      if (existent) {
        return prev.map(i =>
          i.preparatId === preparat.id ? { ...i, cantitate: i.cantitate + 1 } : i
        )
      }
      return [...prev, {
        preparatId: preparat.id,
        numeSnapshot: preparat.nume,
        pretSnapshot: preparat.pret,
        cantitate: 1
      }]
    })
  }

  const scadeInEdit = (preparatId) => {
    setItemsEdit(prev => {
      const item = prev.find(i => i.preparatId === preparatId)
      if (item.cantitate === 1) return prev.filter(i => i.preparatId !== preparatId)
      return prev.map(i =>
        i.preparatId === preparatId ? { ...i, cantitate: i.cantitate - 1 } : i
      )
    })
  }

  const stergedinEdit = (preparatId) => {
    setItemsEdit(prev => prev.filter(i => i.preparatId !== preparatId))
  }

  const handleSalveaza = async (comandaId) => {
    if (itemsEdit.length === 0) {
      setEroareEdit('Comanda trebuie să conțină cel puțin un produs.')
      return
    }
    setSalvand(true)
    setEroareEdit('')
    try {
      const response = await updateComandaItems(comandaId, itemsEdit)
      const data = await response.json()
      if (response.ok) {
        setComenzi(prev => prev.map(c => c.id === comandaId ? data : c))
        setEditandId(null)
        setItemsEdit([])
      } else {
        setEroareEdit(data.error || 'Eroare la salvare')
      }
    } catch {
      setEroareEdit('Eroare de conexiune cu serverul')
    } finally {
      setSalvand(false)
    }
  }

  const totalGeneral = comenzi.reduce((sum, c) => sum + Number(c.total), 0)

  return (
    <div className="comenzi-page">
      <Navbar />

      <div className="comenzi-hero">
        <div className="comenzi-hero-content">
          <div className="comenzi-tag">Contul meu</div>
          <h1>Comenzile Mele</h1>
          <p>Istoricul și statusul comenzilor tale</p>
        </div>
      </div>

      <div className="comenzi-body">
        {loading ? (
          <div className="meniu-loading">
            <div className="loading-dots"><span /><span /><span /></div>
            <p>Se încarcă...</p>
          </div>
        ) : comenzi.length === 0 ? (
          <div className="comenzi-goale">
            <div className="comenzi-goale-icon">📋</div>
            <h3>Nu ai nicio comandă încă</h3>
            <p>Explorează meniul și plasează prima ta comandă!</p>
            <a href="/comanda" className="btn-comanda-acum">Comandă acum</a>
          </div>
        ) : (
          <div className="comenzi-container">
            {comenzi.map((c, index) => (
              <div
                key={c.id}
                className={`comanda-sectiune ${index < comenzi.length - 1 ? 'cu-separator' : ''}`}
              >
                <div className="comanda-sectiune-header">
                  <div className="comanda-data">
                    {new Date(c.createdAt).toLocaleDateString('ro-RO', {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                    {c.rezervareId && (
                      <span className="comanda-rez-badge">Rezervare #{c.rezervareId}</span>
                    )}
                  </div>
                  <div className="comanda-sectiune-dreapta">
                    <span className={`comanda-status ${STATUS_CULORI[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                    {c.status === 'in_asteptare' && editandId !== c.id && (
                      <button className="btn-editeaza" onClick={() => handleStartEdit(c)}>
                        Editează
                      </button>
                    )}
                  </div>
                </div>

                {editandId === c.id ? (
                  <div className="edit-panel">
                    <div className="edit-items-curente">
                      <div className="edit-section-title">Produse în comandă</div>
                      {itemsEdit.length === 0 ? (
                        <div className="edit-gol">Niciun produs — adaugă din meniu</div>
                      ) : itemsEdit.map(item => (
                        <div key={item.preparatId} className="edit-item-row">
                          <span className="edit-item-nume">{item.numeSnapshot}</span>
                          <div className="edit-item-controls">
                            <button className="ctrl-btn" onClick={() => scadeInEdit(item.preparatId)}>−</button>
                            <span className="ctrl-nr">{item.cantitate}</span>
                            <button className="ctrl-btn" onClick={() => adaugaInEdit({ id: item.preparatId, nume: item.numeSnapshot, pret: item.pretSnapshot })}>+</button>
                            <button className="ctrl-btn sterge" onClick={() => stergedinEdit(item.preparatId)}>✕</button>
                          </div>
                          <span className="edit-item-pret">{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</span>
                        </div>
                      ))}
                      <div className="edit-subtotal">
                        Subtotal: <strong>{itemsEdit.reduce((s, i) => s + i.pretSnapshot * i.cantitate, 0).toFixed(2)} RON</strong>
                      </div>
                    </div>

                    <div className="edit-adauga-produse">
                      <div className="edit-section-title">Adaugă produse</div>
                      <div className="edit-categorii">
                        {CATEGORII.map(cat => (
                          <button
                            key={cat}
                            className={`edit-cat-btn ${categorieAdd === cat ? 'activ' : ''}`}
                            onClick={() => handleCategorieAdd(cat)}
                          >{cat}</button>
                        ))}
                      </div>
                      <div className="edit-preparate-lista">
                        {loadingAdd ? (
                          <div className="edit-loading">Se încarcă...</div>
                        ) : preparateAdd.map(p => (
                          <div key={p.id} className="edit-preparat-row">
                            <span className="edit-preparat-nume">{p.nume}</span>
                            <span className="edit-preparat-pret">{p.pret} RON</span>
                            <button className="btn-add-mic" onClick={() => adaugaInEdit(p)}>+ Adaugă</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {eroareEdit && <div className="edit-eroare">⚠ {eroareEdit}</div>}

                    <div className="edit-actiuni">
                      <button className="btn-salveaza" onClick={() => handleSalveaza(c.id)} disabled={salvand}>
                        {salvand ? 'Se salvează...' : 'Salvează modificările'}
                      </button>
                      <button className="btn-anuleaza-edit" onClick={handleAnuleazaEdit}>
                        Anulează
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="comanda-items-list">
                    {c.ComandaItems?.map(item => (
                      <div key={item.id} className="comanda-item-row">
                        <span>{item.numeSnapshot}</span>
                        <span>× {item.cantitate}</span>
                        <span>{(item.pretSnapshot * item.cantitate).toFixed(2)} RON</span>
                      </div>
                    ))}
                    {c.observatii && (
                      <div className="comanda-observatii-text">
                        Observații: {c.observatii}
                      </div>
                    )}
                    <div className="comanda-total-row">Total: {Number(c.total).toFixed(2)} RON</div>
                  </div>
                )}
              </div>
            ))}

            <div className="comenzi-total-final">
              <span>Total general ({comenzi.length} {comenzi.length === 1 ? 'comandă' : 'comenzi'})</span>
              <span className="total-final-suma">{totalGeneral.toFixed(2)} RON</span>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ComenziMele
