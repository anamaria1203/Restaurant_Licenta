export default (sequelize, DataTypes) => {
  return sequelize.define('user', {
    nume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    tip: {
      type: DataTypes.ENUM('client', 'manager'),
      allowNull: false,
      defaultValue: 'client'
    }
  })
}