const comandaItemModel = (sequelize, DataTypes) => {
  return sequelize.define('ComandaItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comandaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preparatId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numeSnapshot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pretSnapshot: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantitate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    timestamps: false
  })
}

export default comandaItemModel
