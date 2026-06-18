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
      userId,
      reservationDate: data,
      hour: ora,
      guestCount: nrPersoane,
      zone: zona,
      occasion: ocazie || null,
      notes: observatii || null
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
      order: [['reservationDate', 'DESC'], ['hour', 'DESC']]
    })
    res.json(rezervari)
  } catch (err) {
    next(err)
  }
}

const getRezervariAdmin = async (req, res, next) => {
  try {
    const rezervari = await db.Rezervare.findAll({
      include: [{ model: db.User, attributes: ['id', 'name', 'email'], where: { deletedAt: null } }],
      order: [['reservationDate', 'DESC'], ['hour', 'DESC']]
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
      updates.cancelledBy = 'manager'
      updates.cancellationNotified = true
    } else {
      updates.cancelledBy = null
    }
    if (status === 'confirmata') {
      updates.confirmationSeen = false
    }

    await rezervare.update(updates)

    if (status === 'anulata') {
      await db.Comanda.update(
        { status: 'anulata' },
        { where: { reservationId: id, status: ['in_asteptare', 'confirmata'] } }
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

    await rezervare.update({ status: 'anulata', cancellationNotified: false, cancelledBy: 'client' })
    await db.Comanda.update(
      { status: 'anulata' },
      { where: { reservationId: id, status: ['in_asteptare', 'confirmata'] } }
    )
    res.json(rezervare)
  } catch (err) {
    next(err)
  }
}

const getAnulateNenotificate = async (req, res, next) => {
  try {
    const rezervari = await db.Rezervare.findAll({
      where: { status: 'anulata', cancellationNotified: false },
      include: [{ model: db.User, attributes: ['id', 'name', 'email'] }],
      order: [['updatedAt', 'DESC']]
    })
    res.json({ count: rezervari.length, rezervari })
  } catch (err) {
    next(err)
  }
}

const marcheazaAnulateVazute = async (req, res, next) => {
  try {
    await db.Rezervare.update(
      { cancellationNotified: true },
      { where: { status: 'anulata', cancellationNotified: false } }
    )
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
      db.Rezervare.findOne({ where: { userId, status: 'confirmata', reservationDate: { [Op.gte]: azi } } }),
      db.Rezervare.findOne({ where: { userId, status: 'in_asteptare', reservationDate: { [Op.gte]: azi } } })
    ])
    res.json({ areRezervare: !!confirmata, areRezervareInAsteptare: !!inAsteptare })
  } catch (err) {
    next(err)
  }
}

const restaureazaRezervareClient = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const rezervare = await db.Rezervare.findOne({ where: { id, userId } })
    if (!rezervare) return res.status(404).json({ error: 'Rezervarea nu a fost găsită' })
    if (rezervare.status !== 'anulata' || rezervare.cancelledBy !== 'client') {
      return res.status(400).json({ error: 'Rezervarea nu poate fi restaurată' })
    }
    await rezervare.update({ status: 'in_asteptare', cancelledBy: null, confirmationSeen: true })
    res.json(rezervare)
  } catch (err) {
    next(err)
  }
}

const getConfirmateNevazute = async (req, res, next) => {
  try {
    const userId = req.user.id
    const count = await db.Rezervare.count({ where: { userId, status: 'confirmata', confirmationSeen: false } })
    res.json({ count })
  } catch (err) {
    next(err)
  }
}

const marcheazaConfirmateVazute = async (req, res, next) => {
  try {
    const userId = req.user.id
    await db.Rezervare.update(
      { confirmationSeen: true },
      { where: { userId, status: 'confirmata', confirmationSeen: false } }
    )
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

export default { creeazaRezervare, getRezervariMele, getRezervariAdmin, updateStatusRezervare, anuleazaRezervare, restaureazaRezervareClient, areRezervareConfirmata, getAnulateNenotificate, marcheazaAnulateVazute, getConfirmateNevazute, marcheazaConfirmateVazute }
