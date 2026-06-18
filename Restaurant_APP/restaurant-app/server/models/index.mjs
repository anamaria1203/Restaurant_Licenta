import { Sequelize, DataTypes } from 'sequelize'
import userModel from './user.mjs'
import preparatModel from './preparat.mjs'
import lunaActivaModel from './lunaActiva.mjs'
import preparatLunarModel from './preparatLunar.mjs'
import comandaModel from './comanda.mjs'
import comandaItemModel from './comandaItem.mjs'
import rezervareModel from './rezervare.mjs'
import mesajModel from './mesaj.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false
})

const User = userModel(sequelize, DataTypes)
const Preparat = preparatModel(sequelize, DataTypes)
const LunaActiva = lunaActivaModel(sequelize, DataTypes)
const PreparatLunar = preparatLunarModel(sequelize, DataTypes)
const Comanda = comandaModel(sequelize, DataTypes)
const ComandaItem = comandaItemModel(sequelize, DataTypes)
const Rezervare = rezervareModel(sequelize, DataTypes)
const Mesaj = mesajModel(sequelize, DataTypes)

Comanda.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Comanda, { foreignKey: 'userId' })

Comanda.hasMany(ComandaItem, { foreignKey: 'orderId' })
ComandaItem.belongsTo(Comanda, { foreignKey: 'orderId' })

ComandaItem.belongsTo(Preparat, { foreignKey: 'dishId' })

Rezervare.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Rezervare, { foreignKey: 'userId' })

Comanda.belongsTo(Rezervare, { foreignKey: 'reservationId' })
Rezervare.hasMany(Comanda, { foreignKey: 'reservationId' })

const db = {
  sequelize,
  User,
  Preparat,
  LunaActiva,
  PreparatLunar,
  Comanda,
  ComandaItem,
  Rezervare,
  Mesaj
}

export default db
