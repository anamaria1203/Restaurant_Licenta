const mesajModel = (sequelize, DataTypes) => {
  return sequelize.define('Mesaj', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    question: { type: DataTypes.TEXT, allowNull: false },
    response: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    respondedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    timestamps: true,
    tableName: 'Messages'
  })
}

export default mesajModel
