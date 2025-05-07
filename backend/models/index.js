// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const models = {};

models.VehicleType = require('./VehicleType')(sequelize, DataTypes);
models.Vehicle = require('./Vehicle')(sequelize, DataTypes);
models.Booking = require('./Booking')(sequelize, DataTypes);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
