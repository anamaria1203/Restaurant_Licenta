import { Sequelize, DataTypes } from 'sequelize'
import userModel from './user.mjs'
import preparatModel from './preparat.mjs'
import lunaActivaModel from './lunaActiva.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false
})

const User = userModel(sequelize, DataTypes)
const Preparat = preparatModel(sequelize, DataTypes)
const LunaActiva = lunaActivaModel(sequelize, DataTypes)

const db = {
  sequelize,
  User,
  Preparat,
  LunaActiva
}

export default db
