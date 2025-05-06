const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');
const vehicleRoutes = require('./routes/vehicle');

app.use(cors());
app.use(express.json());
app.use('/api', vehicleRoutes);

sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected successfully.'))
  .catch((err) => console.error('❌ DB connection failed:', err));

module.exports = app;
