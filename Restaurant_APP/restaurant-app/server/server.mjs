import app from './app.mjs'
import db from './models/index.mjs'

const PORT = process.env.PORT || 8080

db.sequelize.sync({ force: false }).then(() => {
  console.log('Baza de date sincronizata!')
  app.listen(PORT, () => {
    console.log(`Server ruleaza pe portul ${PORT}`)
  })
}).catch(err => {
  console.error('Eroare la sincronizarea bazei de date:', err)
})

