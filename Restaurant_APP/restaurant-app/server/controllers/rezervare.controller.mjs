import db from '../models/index.mjs'
import { Op } from 'sequelize'

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

    const updates = { status }
    if (status === 'anulata') {
      updates.anulataDe = 'manager'
      updates.anulataNotificat = true
    } else {
      updates.anulataDe = null
    }
    if (status === 'confirmata') {
      updates.confirmatVazut = false
    }

    await rezervare.update(updates)

    if (status === 'anulata') {
      await db.Comanda.update(
        { status: 'anulata' },
        { where: { rezervareId: id, status: ['in_asteptare', 'confirmata'] } }
      )
    }

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
    if (!['in_asteptare', 'confirmata'].includes(rezervare.status)) {
      return res.status(400).json({ error: 'Rezervarea nu mai poate fi anulată' })
    }

    await rezervare.update({ status: 'anulata', anulataNotificat: false, anulataDe: 'client' })
    await db.Comanda.update(
      { status: 'anulata' },
      { where: { rezervareId: id, status: ['in_asteptare', 'confirmata'] } }
    )
    res.json(rezervare)
  } catch (err) {
    next(err)
  }
}

const getAnulateNenotificate = async (req, res, next) => {
  try {
    const rezervari = await db.Rezervare.findAll({
      where: { status: 'anulata', anulataNotificat: false },
      include: [{ model: db.User, attributes: ['id', 'nume', 'email'] }],
      order: [['updatedAt', 'DESC']]
    })
    res.json({ count: rezervari.length, rezervari })
  } catch (err) {
    next(err)
  }
}

const marcheazaAnulateVazute = async (req, res, next) => {
  try {
    await db.Rezervare.update({ anulataNotificat: true }, { where: { status: 'anulata', anulataNotificat: false } })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

const areRezervareConfirmata = async (req, res, next) => {
  try {
    const userId = req.user.id
    const azi = new Date().toISOString().split('T')[0]
    const [confirmata, inAsteptare] = await Promise.all([
      db.Rezervare.findOne({ where: { userId, status: 'confirmata', data: { [Op.gte]: azi } } }),
      db.Rezervare.findOne({ where: { userId, status: 'in_asteptare', data: { [Op.gte]: azi } } })
    ])
    res.json({ areRezervare: !!confirmata, areRezervareInAsteptare: !!inAsteptare })
  } catch (err) {
    next(err)
  }
}

const getConfirmateNevazute = async (req, res, next) => {
  try {
    const userId = req.user.id
    const count = await db.Rezervare.count({ where: { userId, status: 'confirmata', confirmatVazut: false } })
    res.json({ count })
  } catch (err) {
    next(err)
  }
}

const marcheazaConfirmateVazute = async (req, res, next) => {
  try {
    const userId = req.user.id
    await db.Rezervare.update({ confirmatVazut: true }, { where: { userId, status: 'confirmata', confirmatVazut: false } })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

export default { creeazaRezervare, getRezervariMele, getRezervariAdmin, updateStatusRezervare, anuleazaRezervare, areRezervareConfirmata, getAnulateNenotificate, marcheazaAnulateVazute, getConfirmateNevazute, marcheazaConfirmateVazute }
