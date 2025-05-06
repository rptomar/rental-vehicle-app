'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const carTypes = [
      { name: 'Hatchback', wheels: 4 },
      { name: 'SUV', wheels: 4 },
      { name: 'Sedan', wheels: 4 },
    ];

    const bikeTypes = [
      { name: 'Cruiser', wheels: 2 },
    ];

    await queryInterface.bulkInsert('VehicleTypes', [...carTypes, ...bikeTypes]);

    const [types] = await queryInterface.sequelize.query(`SELECT id, name FROM "VehicleTypes"`);

    const vehicles = [
      { name: 'Honda Jazz', vehicleTypeId: types.find(t => t.name === 'Hatchback').id },
      { name: 'Toyota Fortuner', vehicleTypeId: types.find(t => t.name === 'SUV').id },
      { name: 'Honda City', vehicleTypeId: types.find(t => t.name === 'Sedan').id },
      { name: 'Royal Enfield', vehicleTypeId: types.find(t => t.name === 'Cruiser').id },
    ];

    await queryInterface.bulkInsert('Vehicles', vehicles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
