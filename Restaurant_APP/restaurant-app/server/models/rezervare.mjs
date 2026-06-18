const rezervareModel = (sequelize, DataTypes) => {
  return sequelize.define('Rezervare', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    reservationDate: { type: DataTypes.DATEONLY, allowNull: false },
    hour: { type: DataTypes.STRING, allowNull: false },
    guestCount: { type: DataTypes.INTEGER, allowNull: false },
    zone: { type: DataTypes.STRING, allowNull: false },
    occasion: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    status: { type: DataTypes.STRING, defaultValue: 'in_asteptare' },
    notes: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    cancellationNotified: { type: DataTypes.BOOLEAN, defaultValue: false },
    cancelledBy: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    confirmationSeen: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    timestamps: true,
    tableName: 'Reservations'
  })
}

export default rezervareModel
