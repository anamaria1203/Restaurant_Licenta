import db from '../models/index.mjs'

const getUseri = async (req, res, next) => {
  try {
    const useri = await db.User.findAll({
      where: { deletedAt: null },
      attributes: ['id', 'nume', 'email', 'tip', 'createdAt']
    })
    res.json(useri)
  } catch (err) { next(err) }
}

const getUseriStersi = async (req, res, next) => {
  try {
    const stersi = await db.User.findAll({
      where: { deletedAt: { [db.sequelize.Sequelize.Op.ne]: null } },
      attributes: ['id', 'nume', 'email', 'tip', 'createdAt', 'deletedAt']
    })
    res.json(stersi)
  } catch (err) { next(err) }
}

const stergeUser = async (req, res, next) => {
  try {
    const { Op } = db.sequelize.Sequelize
    const userId = req.params.id

    const user = await db.User.findByPk(userId)
    if (!user) return res.status(404).json({ error: 'Userul nu a fost gasit' })

    const rezervari = await db.Rezervare.findAll({
      where: { userId, status: { [Op.in]: ['in_asteptare', 'confirmata'] } },
      attributes: ['id']
    })
    const rezervareIds = rezervari.map(r => r.id)

    if (rezervareIds.length > 0) {
      await db.Rezervare.update(
        { status: 'anulata', anulataDe: 'manager', anulataNotificat: true },
        { where: { id: { [Op.in]: rezervareIds } } }
      )
      await db.Comanda.update(
        { status: 'anulata' },
        { where: { rezervareId: { [Op.in]: rezervareIds }, status: { [Op.in]: ['in_asteptare', 'confirmata', 'in_preparare'] } } }
      )
    }

    await db.Comanda.update(
      { status: 'anulata' },
      { where: { userId, rezervareId: null, status: { [Op.in]: ['in_asteptare', 'confirmata', 'in_preparare'] } } }
    )

    await user.update({ deletedAt: new Date() })
    res.json({ message: 'Client sters cu succes' })
  } catch (err) { next(err) }
}

const restaureazaUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'Userul nu a fost gasit' })
    await user.update({ deletedAt: null })
    res.json({ message: 'Client restaurat cu succes' })
  } catch (err) { next(err) }
}

export default { getUseri, getUseriStersi, stergeUser, restaureazaUser }
