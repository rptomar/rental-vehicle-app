// backend/seeders/seed.js
const models = require('../models');

const seed = async () => {
  try {
    await models.sequelize.sync({ force: true }); 

   
    const vehicleTypes = await models.VehicleType.bulkCreate([
      { name: 'Hatchback', wheels: 4 },
      { name: 'SUV', wheels: 4 },
      { name: 'Sedan', wheels: 4 },
      { name: 'Cruiser', wheels: 2 },
    ]);

    
    const typeMap = {};
    vehicleTypes.forEach((type) => {
      typeMap[type.name] = type.id;
    });

    
    await models.Vehicle.bulkCreate([
      { model: 'Maruti Swift', vehicleTypeId: typeMap['Hatchback'] },
      { model: 'Hyundai i20', vehicleTypeId: typeMap['Hatchback'] },
      { model: 'Mahindra XUV700', vehicleTypeId: typeMap['SUV'] },
      { model: 'Toyota Fortuner', vehicleTypeId: typeMap['SUV'] },
      { model: 'Honda City', vehicleTypeId: typeMap['Sedan'] },
      { model: 'Skoda Slavia', vehicleTypeId: typeMap['Sedan'] },
      { model: 'Royal Enfield Classic', vehicleTypeId: typeMap['Cruiser'] },
      { model: 'Bajaj Avenger', vehicleTypeId: typeMap['Cruiser'] },
    ]);

    console.log(' Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(' Seeding failed:', err);
    process.exit(1);
  }
};

seed();
