// backend/models/Vehicle.js
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.VehicleType, {
      foreignKey: 'vehicleTypeId',
      as: 'type',
    });

    Vehicle.hasMany(models.Booking, {
      foreignKey: 'vehicleId',
      as: 'bookings',
    });
  };

  return Vehicle;
};
