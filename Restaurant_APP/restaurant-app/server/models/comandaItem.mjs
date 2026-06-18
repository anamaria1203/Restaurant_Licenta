const comandaItemModel = (sequelize, DataTypes) => {
  return sequelize.define('ComandaItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    dishId: { type: DataTypes.INTEGER, allowNull: true },
    nameSnapshot: { type: DataTypes.STRING, allowNull: false },
    priceSnapshot: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, {
    timestamps: false,
    tableName: 'OrderItems'
  })
}

export default comandaItemModel
