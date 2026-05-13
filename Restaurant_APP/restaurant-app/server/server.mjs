import app from './app.mjs'
import db from './models/index.mjs'

const PORT = process.env.PORT || 8080

async function start() {
  await db.sequelize.sync()

  // Adauga coloane noi fara alter: true (evita bug-ul SQLite cu backup tables)
  const qi = db.sequelize.getQueryInterface()
  const cols = await qi.describeTable('Comandas')
  if (!cols.rezervareId) {
    await qi.addColumn('Comandas', 'rezervareId', {
      type: db.sequelize.Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    })
    console.log('Coloana rezervareId adaugata in Comandas')
  }

  const colsPreparat = await qi.describeTable('Preparats')
  if (!colsPreparat.tip_vreme) {
    await qi.addColumn('Preparats', 'tip_vreme', {
      type: db.sequelize.Sequelize.STRING,
      allowNull: true,
      defaultValue: 'neutru'
    })
    console.log('Coloana tip_vreme adaugata in Preparats')
  }

  console.log('Baza de date sincronizata!')
  app.listen(PORT, () => console.log(`Server ruleaza pe portul ${PORT}`))
}

start().catch(err => console.error('Eroare la pornire:', err))
