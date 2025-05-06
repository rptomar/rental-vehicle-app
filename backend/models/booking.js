// backend/models/Booking.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.Vehicle, {
      foreignKey: 'vehicleId',
      as: 'vehicle',
    });
  };

  return Booking;
};
