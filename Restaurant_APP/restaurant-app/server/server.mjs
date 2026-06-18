import app from './app.mjs'
import db from './models/index.mjs'

const PORT = process.env.PORT || 8080

async function start() {
  await db.sequelize.sync()

  const qi = db.sequelize.getQueryInterface()

  const colsOrder = await qi.describeTable('Orders')
  if (!colsOrder.reservationId) {
    await qi.addColumn('Orders', 'reservationId', {
      type: db.sequelize.Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    })
    console.log('Coloana reservationId adaugata in Orders')
  }

  const colsDish = await qi.describeTable('Dishes')
  if (!colsDish.weatherType) {
    await qi.addColumn('Dishes', 'weatherType', {
      type: db.sequelize.Sequelize.STRING,
      allowNull: true,
      defaultValue: 'neutru'
    })
    console.log('Coloana weatherType adaugata in Dishes')
  }

  const colsReservation = await qi.describeTable('Reservations')
  if (!colsReservation.cancellationNotified) {
    await qi.addColumn('Reservations', 'cancellationNotified', {
      type: db.sequelize.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
    console.log('Coloana cancellationNotified adaugata in Reservations')
  }
  if (!colsReservation.cancelledBy) {
    await qi.addColumn('Reservations', 'cancelledBy', {
      type: db.sequelize.Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    })
    console.log('Coloana cancelledBy adaugata in Reservations')
  }
  if (!colsReservation.confirmationSeen) {
    await qi.addColumn('Reservations', 'confirmationSeen', {
      type: db.sequelize.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
    console.log('Coloana confirmationSeen adaugata in Reservations')
  }

  console.log('Baza de date sincronizata!')
  app.listen(PORT, () => console.log(`Server ruleaza pe portul ${PORT}`))
}

start().catch(err => console.error('Eroare la pornire:', err))
