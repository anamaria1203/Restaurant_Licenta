import { Sequelize, DataTypes } from 'sequelize'
import userModel from './user.mjs'
import preparatModel from './preparat.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false
})

const User = userModel(sequelize, DataTypes)
const Preparat = preparatModel(sequelize, DataTypes)

const db = {
  sequelize,
  User,
  Preparat
}

export default db
