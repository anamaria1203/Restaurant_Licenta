const lunaActivaModel = (sequelize, DataTypes) => {
  return sequelize.define('LunaActiva', {
    tara: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'spaniola'
    }
  })
}

export default lunaActivaModel
