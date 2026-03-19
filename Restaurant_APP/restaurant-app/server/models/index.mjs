import { Sequelize, DataTypes } from 'sequelize'
import userModel from './user.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false
})

const User = userModel(sequelize, DataTypes)

const db = {
  sequelize,
  User
}

export default db