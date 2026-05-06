const preparatLunarModel = (sequelize, DataTypes) => {
  return sequelize.define('PreparatLunar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tara: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descriere: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pret: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imagine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    este_desert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  })
}

export default preparatLunarModel
