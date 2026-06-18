const preparatModel = (sequelize, DataTypes) => {
  return sequelize.define('Preparat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    subcategory: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    badge: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    allergens: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
    vegan: { type: DataTypes.BOOLEAN, defaultValue: false },
    weatherType: { type: DataTypes.STRING, allowNull: true, defaultValue: 'neutru' }
  }, {
    timestamps: false,
    tableName: 'Dishes'
  })
}

export default preparatModel
