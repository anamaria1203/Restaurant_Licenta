import db from '../models/index.mjs'

const creeazaComanda = async (req, res, next) => {
  try {
    const { items, notes, reservationId } = req.body
    const userId = req.user.id

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Comanda trebuie sa contina cel putin un produs' })
    }
    if (!reservationId) {
      return res.status(400).json({ error: 'Este necesara o rezervare confirmata' })
    }
    const rezervare = await db.Rezervare.findOne({ where: { id: reservationId, userId } })
    if (!rezervare || rezervare.status !== 'confirmata') {
      return res.status(400).json({ error: 'Rezervarea nu este valida sau nu este confirmata' })
    }


    const total = items.reduce((sum, item) => sum + item.pretSnapshot * item.cantitate, 0)

    const comanda = await db.Comanda.create({ userId, total, notes, reservationId: reservationId || null })

    const itemsDeCreat = items.map(item => ({
      orderId: comanda.id,
      dishId: item.preparatId,
      nameSnapshot: item.numeSnapshot,
      priceSnapshot: item.pretSnapshot,
      quantity: item.cantitate
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
        { model: db.User, attributes: ['id', 'name', 'email'], where: { deletedAt: null } }
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

    await db.ComandaItem.destroy({ where: { orderId: id } })

    const itemsDeCreat = items.map(item => ({
      orderId: Number(id),
      dishId: item.preparatId,
      nameSnapshot: item.numeSnapshot,
      priceSnapshot: item.pretSnapshot,
      quantity: item.cantitate
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

const getStatistici = async (req, res, next) => {
  try {
    const peOre = await db.sequelize.query(
      `SELECT
         CAST(substr(r.hour, 1, 2) AS INTEGER) AS ora,
         COUNT(DISTINCT r.id) AS nrRezervari,
         COALESCE(SUM(ci.quantity), 0) AS totalPreparate
       FROM Reservations r
       INNER JOIN Orders c ON c.reservationId = r.id AND c.status != 'anulata'
       LEFT JOIN OrderItems ci ON ci.orderId = c.id
       WHERE r.status != 'anulata'
       GROUP BY ora
       ORDER BY ora`,
      { type: db.sequelize.QueryTypes.SELECT }
    )

    const peZile = await db.sequelize.query(
      `SELECT
         CAST(strftime('%w', r.reservationDate) AS INTEGER) AS ziuaIndex,
         COUNT(DISTINCT r.id) AS nrRezervari,
         COALESCE(SUM(ci.quantity), 0) AS totalPreparate
       FROM Reservations r
       INNER JOIN Orders c ON c.reservationId = r.id AND c.status != 'anulata'
       LEFT JOIN OrderItems ci ON ci.orderId = c.id
       WHERE r.status != 'anulata'
       GROUP BY ziuaIndex
       ORDER BY ziuaIndex`,
      { type: db.sequelize.QueryTypes.SELECT }
    )

    const ZILE = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']

    const oreComplete = Array.from({ length: 24 }, (_, i) => {
      const gasit = peOre.find(r => Number(r.ora) === i)
      return {
        ora: `${String(i).padStart(2, '0')}:00`,
        nrRezervari:    gasit ? Number(gasit.nrRezervari)    : 0,
        totalPreparate: gasit ? Number(gasit.totalPreparate) : 0
      }
    })

    const zileComplete = Array.from({ length: 7 }, (_, i) => {
      const gasit = peZile.find(r => Number(r.ziuaIndex) === i)
      return {
        ziua:           ZILE[i],
        nrRezervari:    gasit ? Number(gasit.nrRezervari)    : 0,
        totalPreparate: gasit ? Number(gasit.totalPreparate) : 0
      }
    })

    res.json({ peOre: oreComplete, peZile: zileComplete })
  } catch (err) {
    next(err)
  }
}

const getPreferinteMele = async (req, res, next) => {
  try {
    const userId = req.user.id
    const preferinte = await db.sequelize.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.category,
        p.subcategory,
        p.image,
        SUM(ci.quantity) AS totalComandat
       FROM OrderItems ci
       INNER JOIN Orders c ON ci.orderId = c.id AND c.userId = :userId
       INNER JOIN Dishes p ON ci.dishId = p.id
       GROUP BY p.id
       ORDER BY totalComandat DESC
       LIMIT 10`,
      { replacements: { userId }, type: db.sequelize.QueryTypes.SELECT }
    )
    res.json(preferinte)
  } catch (err) {
    next(err)
  }
}

const getMenuEvolution = async (req, res, next) => {
  try {
    const preparate = await db.sequelize.query(
      `SELECT
        p.id, p.name, p.category, p.subcategory, p.image, p.available, p.weatherType,
        COALESCE(SUM(CASE WHEN c.createdAt >= date('now', '-30 days') THEN ci.quantity ELSE 0 END), 0) AS totalUltimele30Zile,
        MAX(c.createdAt) AS ultimaComanda
       FROM Dishes p
       LEFT JOIN OrderItems ci ON ci.dishId = p.id
       LEFT JOIN Orders c ON ci.orderId = c.id AND c.status != 'anulata'
       GROUP BY p.id
       ORDER BY totalUltimele30Zile DESC`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    res.json(preparate)
  } catch (err) {
    next(err)
  }
}

export default { creeazaComanda, getComenziUser, getComenziAdmin, updateStatusComanda, updateComandaItems, getPreferinteMele, getStatistici, getMenuEvolution }
