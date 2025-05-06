// backend/models/VehicleType.js
module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    wheels: {
      type: DataTypes.INTEGER,
      allowNull: false, // 2 or 4
    },
  });

  VehicleType.associate = (models) => {
    VehicleType.hasMany(models.Vehicle, {
      foreignKey: 'vehicleTypeId',
      as: 'vehicles',
    });
  };

  return VehicleType;
};
