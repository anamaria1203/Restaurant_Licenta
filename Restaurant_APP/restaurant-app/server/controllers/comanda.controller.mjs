import db from '../models/index.mjs'

const creeazaComanda = async (req, res, next) => {
  try {
    const { items, observatii } = req.body
    const userId = req.user.id

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Comanda trebuie sa contina cel putin un produs' })
    }

    const total = items.reduce((sum, item) => sum + item.pretSnapshot * item.cantitate, 0)

    const comanda = await db.Comanda.create({ userId, total, observatii })

    const itemsDeCreat = items.map(item => ({
      comandaId: comanda.id,
      preparatId: item.preparatId,
      numeSnapshot: item.numeSnapshot,
      pretSnapshot: item.pretSnapshot,
      cantitate: item.cantitate
    }))

    await db.ComandaItem.bulkCreate(itemsDeCreat)

    const comandaCompleta = await db.Comanda.findByPk(comanda.id, {
      include: [{ model: db.ComandaItem }]
    })

    res.status(201).json(comandaCompleta)
  } catch (err) {
    next(err)
  }
}

const getComenziUser = async (req, res, next) => {
  try {
    const userId = req.user.id
    const comenzi = await db.Comanda.findAll({
      where: { userId },
      include: [{ model: db.ComandaItem }],
      order: [['createdAt', 'DESC']]
    })
    res.json(comenzi)
  } catch (err) {
    next(err)
  }
}

const getComenziAdmin = async (req, res, next) => {
  try {
    const comenzi = await db.Comanda.findAll({
      include: [
        { model: db.ComandaItem },
        { model: db.User, attributes: ['id', 'nume', 'email'], where: { deletedAt: null } }
      ],
      order: [['createdAt', 'DESC']]
    })
    res.json(comenzi)
  } catch (err) {
    next(err)
  }
}

const updateStatusComanda = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const statusValide = ['in_asteptare', 'confirmata', 'in_preparare', 'livrata', 'anulata']
    if (!statusValide.includes(status)) {
      return res.status(400).json({ error: 'Status invalid' })
    }

    const comanda = await db.Comanda.findByPk(id)
    if (!comanda) return res.status(404).json({ error: 'Comanda nu a fost gasita' })

    await comanda.update({ status })
    res.json({ mesaj: 'Status actualizat', comanda })
  } catch (err) {
    next(err)
  }
}

const updateComandaItems = async (req, res, next) => {
  try {
    const { id } = req.params
    const { items } = req.body
    const userId = req.user.id

    const comanda = await db.Comanda.findOne({ where: { id, userId } })
    if (!comanda) return res.status(404).json({ error: 'Comanda nu a fost gasita' })
    if (comanda.status !== 'in_asteptare') {
      return res.status(400).json({ error: 'Comanda nu mai poate fi modificata' })
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Comanda trebuie sa contina cel putin un produs' })
    }

    await db.ComandaItem.destroy({ where: { comandaId: id } })

    const itemsDeCreat = items.map(item => ({
      comandaId: Number(id),
      preparatId: item.preparatId,
      numeSnapshot: item.numeSnapshot,
      pretSnapshot: item.pretSnapshot,
      cantitate: item.cantitate
    }))

    await db.ComandaItem.bulkCreate(itemsDeCreat)

    const total = items.reduce((sum, item) => sum + item.pretSnapshot * item.cantitate, 0)
    await comanda.update({ total })

    const comandaActualizata = await db.Comanda.findByPk(id, {
      include: [{ model: db.ComandaItem }]
    })

    res.json(comandaActualizata)
  } catch (err) {
    next(err)
  }
}

export default { creeazaComanda, getComenziUser, getComenziAdmin, updateStatusComanda, updateComandaItems }
