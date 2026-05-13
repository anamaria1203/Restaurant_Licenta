const preparatModel = (sequelize, DataTypes) => {
  return sequelize.define('Preparat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    categorie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategorie: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    badge: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    alergeni: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    disponibil: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tip_vreme: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'neutru'
    }
  }, {
    timestamps: false
  })
}

export default preparatModel
