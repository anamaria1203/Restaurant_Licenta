import db from '../models/index.mjs'

const ZONE_VALIDE = ['retras', 'fereastra', 'terasa', 'central', 'vip']
const STATUS_VALIDE = ['in_asteptare', 'confirmata', 'anulata']

const creeazaRezervare = async (req, res, next) => {
  try {
    const { data, ora, nrPersoane, zona, ocazie, observatii } = req.body
    const userId = req.user.id

    if (!data || !ora || !nrPersoane || !zona) {
      return res.status(400).json({ error: 'Câmpurile data, ora, nrPersoane și zona sunt obligatorii' })
    }
    if (!ZONE_VALIDE.includes(zona)) {
      return res.status(400).json({ error: 'Zona selectată este invalidă' })
    }
    if (nrPersoane < 1 || nrPersoane > 20) {
      return res.status(400).json({ error: 'Numărul de persoane trebuie să fie între 1 și 20' })
    }

    const rezervare = await db.Rezervare.create({
      userId, data, ora, nrPersoane, zona,
      ocazie: ocazie || null,
      observatii: observatii || null
    })

    res.status(201).json(rezervare)
  } catch (err) {
    next(err)
  }
}

const getRezervariMele = async (req, res, next) => {
  try {
    const userId = req.user.id
    const rezervari = await db.Rezervare.findAll({
      where: { userId },
      order: [['data', 'DESC'], ['ora', 'DESC']]
    })
    res.json(rezervari)
  } catch (err) {
    next(err)
  }
}

const getRezervariAdmin = async (req, res, next) => {
  try {
    const rezervari = await db.Rezervare.findAll({
      include: [{ model: db.User, attributes: ['id', 'nume', 'email'], where: { deletedAt: null } }],
      order: [['data', 'DESC'], ['ora', 'DESC']]
    })
    res.json(rezervari)
  } catch (err) {
    next(err)
  }
}

const updateStatusRezervare = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!STATUS_VALIDE.includes(status)) {
      return res.status(400).json({ error: 'Status invalid' })
    }

    const rezervare = await db.Rezervare.findByPk(id)
    if (!rezervare) return res.status(404).json({ error: 'Rezervarea nu a fost găsită' })

    await rezervare.update({ status })
    res.json(rezervare)
  } catch (err) {
    next(err)
  }
}

const anuleazaRezervare = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const rezervare = await db.Rezervare.findOne({ where: { id, userId } })
    if (!rezervare) return res.status(404).json({ error: 'Rezervarea nu a fost găsită' })
    if (rezervare.status !== 'in_asteptare') {
      return res.status(400).json({ error: 'Doar rezervările în așteptare pot fi anulate' })
    }

    await rezervare.update({ status: 'anulata' })
    res.json(rezervare)
  } catch (err) {
    next(err)
  }
}

const areRezervareConfirmata = async (req, res, next) => {
  try {
    const userId = req.user.id
    const rezervare = await db.Rezervare.findOne({
      where: { userId, status: 'confirmata' }
    })
    res.json({ areRezervare: !!rezervare })
  } catch (err) {
    next(err)
  }
}

export default { creeazaRezervare, getRezervariMele, getRezervariAdmin, updateStatusRezervare, anuleazaRezervare, areRezervareConfirmata }
