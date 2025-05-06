const express = require('express');
const router = express.Router();
const {
  getVehicleTypes,
  getVehicles,
  submitBooking
} = require('../controllers/vehicleController');

router.get('/', (req, res) => {
  res.send("api is ready");
});
router.get('/types', getVehicleTypes);
router.get('/vehicles', getVehicles);
router.post('/book', submitBooking);

module.exports = router;
