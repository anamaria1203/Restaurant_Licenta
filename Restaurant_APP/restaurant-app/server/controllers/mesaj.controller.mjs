import db from '../models/index.mjs'

const trimiteMesaj = async (req, res, next) => {
  try {
    const { intrebare } = req.body
    const userId = req.user.id
    const user = await db.User.findByPk(userId)
    if (!user) return res.status(404).json({ error: 'Utilizatorul nu există' })
    if (!intrebare) return res.status(400).json({ error: 'Întrebarea este obligatorie' })
    const mesaj = await db.Mesaj.create({ userId, nume: user.nume, email: user.email, intrebare })
    res.status(201).json(mesaj)
  } catch (err) { next(err) }
}

const getMesajeleMe = async (req, res, next) => {
  try {
    const mesaje = await db.Mesaj.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
    res.json(mesaje)
  } catch (err) { next(err) }
}

const getMesaje = async (req, res, next) => {
  try {
    const mesaje = await db.Mesaj.findAll({ order: [['createdAt', 'DESC']] })
    res.json(mesaje)
  } catch (err) { next(err) }
}

const marcheazaCitit = async (req, res, next) => {
  try {
    const mesaj = await db.Mesaj.findByPk(req.params.id)
    if (!mesaj) return res.status(404).json({ error: 'Mesajul nu există' })
    await mesaj.update({ citit: true })
    res.json(mesaj)
  } catch (err) { next(err) }
}

const getNecititeCount = async (req, res, next) => {
  try {
    const count = await db.Mesaj.count({ where: { citit: false } })
    res.json({ count })
  } catch (err) { next(err) }
}

const raspundeMesaj = async (req, res, next) => {
  try {
    const { raspuns } = req.body
    if (!raspuns) return res.status(400).json({ error: 'Răspunsul este obligatoriu' })
    const mesaj = await db.Mesaj.findByPk(req.params.id)
    if (!mesaj) return res.status(404).json({ error: 'Mesajul nu există' })
    await mesaj.update({ raspuns, raspunsAt: new Date(), citit: true })
    res.json(mesaj)
  } catch (err) { next(err) }
}

export default { trimiteMesaj, getMesajeleMe, getMesaje, marcheazaCitit, getNecititeCount, raspundeMesaj }
