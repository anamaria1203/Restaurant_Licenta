import { useState, useEffect } from 'react'
import { getRecomandateMeteo } from '../../services/api'
import './WeatherBanner.css'

const WEATHER_EMOJI = {
  Clear: '☀️', Clouds: '⛅', Rain: '🌧️', Drizzle: '🌦️',
  Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️', Haze: '🌫️'
}

const determineazaTip = (temp, conditie) => {
  if (['Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(conditie) || temp < 15) return 'cald'
  if (temp > 25) return 'rece'
  return null
}

const WeatherBanner = ({ onAdauga, adaugat }) => {
  const [vreme, setVreme] = useState(null)
  const [preparate, setPreparate] = useState([])
  const [vizibil, setVizibil] = useState(true)

  useEffect(() => {
    const cheie = process.env.REACT_APP_WEATHER_API_KEY
    if (!cheie || cheie === 'PUNE_CHEIA_TA_AICI') return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bucuresti,ro&appid=${cheie}&units=metric&lang=ro`)
      .then(r => r.json())
      .then(async data => {
        if (!data.main) return
        const temp = Math.round(data.main.temp)
        const conditie = data.weather?.[0]?.main || 'Clear'
        const descriere = data.weather?.[0]?.description || ''
        const tip = determineazaTip(temp, conditie)

        setVreme({ temp, conditie, descriere, emoji: WEATHER_EMOJI[conditie] || '🌡️', tip })

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
        <div className="wb-emoji">{vreme.emoji}</div>
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
            {p.imagine && (
              <img
                src={`/images/meniu/${p.imagine}`}
                alt={p.nume}
                className="wb-card-img"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
            <div className="wb-card-body">
              <span className="wb-card-nume">{p.nume}</span>
              <span className="wb-card-pret">{p.pret} RON</span>
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
