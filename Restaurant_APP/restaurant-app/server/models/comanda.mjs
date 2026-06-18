const comandaModel = (sequelize, DataTypes) => {
  return sequelize.define('Comanda', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'in_asteptare' },
    total: { type: DataTypes.FLOAT, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    reservationId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null }
  }, {
    timestamps: true,
    tableName: 'Orders'
  })
}

export default comandaModel
