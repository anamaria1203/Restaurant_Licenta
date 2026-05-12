const BASE_URL = 'http://localhost:8080'

const apiFetch = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, { credentials: 'include', ...options })
    .then(res => {
      if (res.status === 401 && !window.location.pathname.includes('admin-login')) {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          if (user?.tip === 'manager') {
            localStorage.removeItem('user')
            window.location.href = '/admin-login?mod=login'
          }
        } catch {}
      }
      return res
    })

// ─── MENIU ───────────────────────────────────────────
export const getMeniu = (categorie, subcategorie) => {
  let url = `/meniu/preparate?categorie=${encodeURIComponent(categorie)}`
  if (subcategorie) url += `&subcategorie=${encodeURIComponent(subcategorie)}`
  return apiFetch(url).then(r => r.json())
}

// ─── MENIU LUNAR ─────────────────────────────────────
export const getPreparateLunare = (tara) =>
  apiFetch(`/meniu-lunar/preparate?tara=${tara}`).then(r => r.json())

export const getLunaActiva = () =>
  apiFetch('/luna/activa').then(r => r.json())

export const setLunaActiva = (tara) =>
  apiFetch('/luna/activa', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tara })
  })

export const adaugaPreparatLunar = (data) =>
  apiFetch('/meniu-lunar/preparate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const editeazaPreparatLunar = (id, data) =>
  apiFetch(`/meniu-lunar/preparate/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const stergePreparatLunar = (id) =>
  apiFetch(`/meniu-lunar/preparate/${id}`, { method: 'DELETE' })

// ─── RECENZII ────────────────────────────────────────
export const getRecenzii = () =>
  apiFetch('/recenzii').then(r => r.json())

// ─── AUTH ────────────────────────────────────────────
export const authRegister = (body) =>
  apiFetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

export const authLogin = (body) =>
  apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

export const authAdminLogin = (body) =>
  apiFetch('/auth/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

export const authLogout = () =>
  apiFetch('/auth/logout', { method: 'POST' })

export const verificaEmail = (email) =>
  apiFetch('/auth/verifica-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })

export const resetParola = (email, parolaNoua) =>
  apiFetch('/auth/reset-parola', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, parolaNoua })
  })

// ─── API ADMIN ───────────────────────────────────────
export const getUseri = () => apiFetch('/api/useri')
export const getUseriStersi = () => apiFetch('/api/useri/stersi')
export const stergeUser = (id) => apiFetch(`/api/useri/${id}`, { method: 'DELETE' })
export const restaureazaUser = (id) => apiFetch(`/api/useri/${id}/restaurare`, { method: 'POST' })

// ─── COMENZI ─────────────────────────────────────────
export const creeazaComanda = (items, observatii, rezervareId) =>
  apiFetch('/comanda', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, observatii, rezervareId: rezervareId || null })
  })

export const getComenziMele = () =>
  apiFetch('/comanda/ale-mele').then(r => r.json())

export const getComenziAdmin = () =>
  apiFetch('/comanda/toate').then(r => r.json())

export const getPreferinteMele = () =>
  apiFetch('/comanda/preferinte').then(r => r.json())

export const getStatisticiComenzi = () =>
  apiFetch('/comanda/statistici').then(r => r.json())

export const getMenuEvolution = () =>
  apiFetch('/comanda/menu-evolution').then(r => r.json())

export const toggleDisponibil = (id) =>
  apiFetch(`/meniu/preparate/${id}/disponibil`, { method: 'PUT' }).then(r => r.json())

export const updateStatusComanda = (id, status) =>
  apiFetch(`/comanda/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })

export const updateComandaItems = (id, items) =>
  apiFetch(`/comanda/${id}/items`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })

// ─── REZERVĂRI ───────────────────────────────────────
export const creeazaRezervare = (body) =>
  apiFetch('/rezervare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

export const getRezervariMele = () =>
  apiFetch('/rezervare/ale-mele').then(r => r.json())

export const getRezervariAdmin = () =>
  apiFetch('/rezervare/toate').then(r => r.json())

export const updateStatusRezervare = (id, status) =>
  apiFetch(`/rezervare/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })

export const anuleazaRezervare = (id) =>
  apiFetch(`/rezervare/${id}/anuleaza`, { method: 'PUT' })

export const areRezervareConfirmata = () =>
  apiFetch('/rezervare/are-rezervare-confirmata').then(r => r.json())
