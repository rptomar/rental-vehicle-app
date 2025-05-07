const { VehicleType, Vehicle, Booking } = require('../models');
const { Op } = require('sequelize');

exports.getVehicleTypes = async (req, res) => {
  const wheels = parseInt(req.query.wheels); 
  if (isNaN(wheels)) {
    return res.status(400).json({ message: 'Invalid wheels parameter' });
  }
  
  const types = await VehicleType.findAll({ where: { wheels } });
  res.json(types);
};

exports.getVehicles = async (req, res) => {
  const typeId  =  parseInt(req.query.typeId); 
  if (isNaN(typeId)) {
    return res.status(400).json({ message: 'Invalid models parameter' });
  }
  const vehicles = await Vehicle.findAll({ where: { vehicleTypeId: typeId } });
  res.json(vehicles);
};

exports.submitBooking = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  const conflict = await Booking.findOne({
    where: {
      vehicleId,
      [Op.or]: [
        {
          startDate: { [Op.between]: [startDate, endDate] }
        },
        {
          endDate: { [Op.between]: [startDate, endDate] }
        }
      ]
    }
  });

  if (conflict) return res.status(409).json({ message: 'Vehicle already booked in this range' });

  const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
  res.status(201).json(booking);
};
