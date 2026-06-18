const preparatLunarModel = (sequelize, DataTypes) => {
  return sequelize.define('PreparatLunar', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    country: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    isDessert: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    timestamps: false,
    tableName: 'MonthlyDishes'
  })
}

export default preparatLunarModel
