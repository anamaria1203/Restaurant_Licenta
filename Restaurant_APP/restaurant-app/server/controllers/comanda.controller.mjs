import db from '../models/index.mjs'

const creeazaComanda = async (req, res, next) => {
  try {
    const { items, observatii, rezervareId } = req.body
    const userId = req.user.id

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Comanda trebuie sa contina cel putin un produs' })
    }
    if (!rezervareId) {
      return res.status(400).json({ error: 'Este necesara o rezervare confirmata' })
    }
    const rezervare = await db.Rezervare.findOne({ where: { id: rezervareId, userId } })
    if (!rezervare || rezervare.status !== 'confirmata') {
      return res.status(400).json({ error: 'Rezervarea nu este valida sau nu este confirmata' })
    }

    const total = items.reduce((sum, item) => sum + item.pretSnapshot * item.cantitate, 0)

    const comanda = await db.Comanda.create({ userId, total, observatii, rezervareId: rezervareId || null })

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

const getStatistici = async (req, res, next) => {
  try {
    const peOre = await db.sequelize.query(
      `SELECT
         CAST(substr(r.ora, 1, 2) AS INTEGER) AS ora,
         COUNT(DISTINCT r.id) AS nrRezervari,
         COALESCE(SUM(ci.cantitate), 0) AS totalPreparate
       FROM Rezervares r
       INNER JOIN Comandas c ON c.rezervareId = r.id AND c.status != 'anulata'
       LEFT JOIN ComandaItems ci ON ci.comandaId = c.id
       WHERE r.status != 'anulata'
       GROUP BY ora
       ORDER BY ora`,
      { type: db.sequelize.QueryTypes.SELECT }
    )

    const peZile = await db.sequelize.query(
      `SELECT
         CAST(strftime('%w', r.data) AS INTEGER) AS ziuaIndex,
         COUNT(DISTINCT r.id) AS nrRezervari,
         COALESCE(SUM(ci.cantitate), 0) AS totalPreparate
       FROM Rezervares r
       INNER JOIN Comandas c ON c.rezervareId = r.id AND c.status != 'anulata'
       LEFT JOIN ComandaItems ci ON ci.comandaId = c.id
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
        p.nume,
        p.descriere,
        p.pret,
        p.categorie,
        p.subcategorie,
        p.imagine,
        SUM(ci.cantitate) AS totalComandat
       FROM ComandaItems ci
       INNER JOIN Comandas c ON ci.comandaId = c.id AND c.userId = :userId
       INNER JOIN Preparats p ON ci.preparatId = p.id
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
        p.id, p.nume, p.categorie, p.subcategorie, p.imagine, p.disponibil, p.tip_vreme,
        COALESCE(SUM(CASE WHEN c.createdAt >= date('now', '-30 days') THEN ci.cantitate ELSE 0 END), 0) AS totalUltimele30Zile,
        MAX(c.createdAt) AS ultimaComanda
       FROM Preparats p
       LEFT JOIN ComandaItems ci ON ci.preparatId = p.id
       LEFT JOIN Comandas c ON ci.comandaId = c.id AND c.status != 'anulata'
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
