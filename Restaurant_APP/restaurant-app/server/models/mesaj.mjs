const mesajModel = (sequelize, DataTypes) => {
  return sequelize.define('Mesaj', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    nume: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    intrebare: { type: DataTypes.TEXT, allowNull: false },
    raspuns: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    raspunsAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    citit: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { timestamps: true })
}

export default mesajModel
