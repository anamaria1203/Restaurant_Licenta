import './Meniu.css'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const CATEGORII = ['Aperitive', 'Supe', 'Carne', 'Pește', 'Paste & Risotto', 'Deserturi', 'Bauturi']
const SUBCATEGORII_BAUTURI = ['Vinuri', 'Whisky', 'Rom', 'Cocktailuri', 'Beri', 'Sucuri', 'Ceaiuri']

const BADGE_CULORI = {
  "Chef's Choice": 'badge-chef',
  'Signature': 'badge-signature',
  'Sezonier': 'badge-sezonier'
}

const Meniu = () => {
  const [preparate, setPreparate] = useState([])
  const [loading, setLoading] = useState(true)
  const [categorieActiva, setCategorieActiva] = useState('Aperitive')
  const [subcategorieActiva, setSubcategorieActiva] = useState('Vinuri')

  useEffect(() => {
    fetchPreparate()
  }, [categorieActiva, subcategorieActiva])

  const fetchPreparate = async () => {
    setLoading(true)
    try {
      let url = `http://localhost:8080/meniu/preparate?categorie=${encodeURIComponent(categorieActiva)}`
      if (categorieActiva === 'Bauturi') {
        url += `&subcategorie=${encodeURIComponent(subcategorieActiva)}`
      }
      const res = await fetch(url)
      const data = await res.json()
      setPreparate(data)
    } catch (err) {
      console.error('Eroare la incarcarea meniului:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorieClick = (cat) => {
    setCategorieActiva(cat)
    if (cat === 'Bauturi') setSubcategorieActiva('Vinuri')
  }

  return (
    <div className="meniu-page">
      <Navbar />

      <div className="meniu-hero">
        <div className="meniu-hero-content">
          <div className="meniu-tag">Villa Ana Ristorante</div>
          <h1>Meniul Nostru</h1>
          <p>Preparate cu ingrediente de sezon, inspirate din tradițiile italiene și mediteraneene</p>
        </div>
      </div>

      <div className="meniu-body">

        {/* Categorii principale */}
        <div className="categorii-bar">
          {CATEGORII.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${categorieActiva === cat ? 'activ' : ''}`}
              onClick={() => handleCategorieClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategorii pentru Băuturi */}
        {categorieActiva === 'Bauturi' && (
          <div className="subcategorii-bar">
            {SUBCATEGORII_BAUTURI.map(sub => (
              <button
                key={sub}
                className={`subcat-btn ${subcategorieActiva === sub ? 'activ' : ''}`}
                onClick={() => setSubcategorieActiva(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Grid preparate */}
        {loading ? (
          <div className="meniu-loading">Se incarcă...</div>
        ) : (
          <div className="preparate-grid">
            {preparate.map(p => (
              <div key={p.id} className="preparat-card">
                <div className="preparat-imagine-wrapper">
                  <div className="preparat-imagine-placeholder">
                    {p.imagine ? (
                      <img
                        src={`/images/meniu/${p.imagine}`}
                        alt={p.nume}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    ) : null}
                    <div className="imagine-icon">🍽</div>
                  </div>
                  {p.badge && (
                    <span className={`preparat-badge ${BADGE_CULORI[p.badge] || ''}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="preparat-info">
                  <h3>{p.nume}</h3>
                  <p className="preparat-descriere">{p.descriere}</p>
                  {p.alergeni && (
                    <p className="preparat-alergeni">
                      <span>Alergeni:</span> {p.alergeni}
                    </p>
                  )}
                  <div className="preparat-footer">
                    <span className="preparat-pret">{p.pret} RON</span>
                    <button className="btn-adauga">Adaugă la comandă</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Meniu
