import { useState, useEffect } from 'react'
import { getRecomandateMeteo } from '../../services/api'
import './WeatherBanner.css'


const determinaTip= (temp, conditie) => {
  if (['Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(conditie) || temp < 17) return 'cald'
  if (temp > 19) return 'rece'
  return null
}

const WeatherBanner = ({ onAdauga, adaugat }) => {
  const [vreme, setVreme] = useState(null)
  const [preparate, setPreparate] = useState([])
  const [vizibil, setVizibil] = useState(true)

  useEffect(() => {
    const cheie = process.env.REACT_APP_WEATHER_API_KEY
    if (!cheie || cheie === 'CHEIA') return

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.4268&lon=26.1025&appid=${cheie}&units=metric&lang=ro`)

      .then(r => {
        if (!r.ok) throw new Error('API key inactiva')
        return r.json()
      })
      .then(async data => {
        if (!data.main) return
        const temp = Math.round(data.main.temp)
        const conditie = data.weather?.[0]?.main || 'Clear'
        const descriere = data.weather?.[0]?.description || ''
        const tip = determinaTip(temp, conditie)

        setVreme({ temp, conditie, descriere, tip })

        if (!tip) return
        const rec = await getRecomandateMeteo(tip)
        if (rec.length > 0) setPreparate(rec)
      })
      .catch(() => {})
  }, [])

  if (!vreme || !vreme.tip || preparate.length === 0 || !vizibil) return null

  const mesaj = vreme.tip === 'cald'
    ? 'Zi rece afară — preparate calde recomandate'
    : 'Zi caldă afară — preparate răcoritoare recomandate'

  return (
    <div className="wb-banner">
      <button className="wb-close" onClick={() => setVizibil(false)}>✕</button>

      <div className="wb-stanga">
<div className="wb-info">
          <div className="wb-temp">{vreme.temp}°C</div>
          <div className="wb-descriere">{vreme.descriere}</div>
          <div className="wb-mesaj">{mesaj}</div>
        </div>
      </div>

      <div className="wb-separator" />

      <div className="wb-preparate">
        {preparate.map(p => (
          <div key={p.id} className="wb-card">
            {p.image && (
              <img
                src={`/images/meniu/${p.image}`}
                alt={p.nume}
                className="wb-card-img"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
            <div className="wb-card-body">
              <span className="wb-card-nume">{p.name}</span>
              <span className="wb-card-pret">{p.price} RON</span>
              <button className="wb-card-btn" onClick={() => onAdauga(p)}>
                {adaugat === p.id ? '✓' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherBanner
