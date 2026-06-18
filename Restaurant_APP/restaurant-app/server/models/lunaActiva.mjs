const lunaActivaModel = (sequelize, DataTypes) => {
  return sequelize.define('LunaActiva', {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'spaniola'
    }
  }, {
    tableName: 'ActiveMonths'
  })
}

export default lunaActivaModel
