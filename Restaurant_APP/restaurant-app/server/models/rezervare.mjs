const rezervareModel = (sequelize, DataTypes) => {
  return sequelize.define('Rezervare', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    ora: { type: DataTypes.STRING, allowNull: false },
    nrPersoane: { type: DataTypes.INTEGER, allowNull: false },
    zona: { type: DataTypes.STRING, allowNull: false },
    ocazie: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    status: { type: DataTypes.STRING, defaultValue: 'in_asteptare' },
    observatii: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    anulataNotificat: { type: DataTypes.BOOLEAN, defaultValue: false },
    anulataDe: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    confirmatVazut: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { timestamps: true })
}

export default rezervareModel
