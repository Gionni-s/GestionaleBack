const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const Warehouse = require('../src/api/werehouses/controller');
const Food = require('../src/api/foods/controller');
const Location = require('../src/api/locations/controller');
const WarehouseEntity =
  require('../src/api/warehouse-entities/controller');
const mongoUrl = require('../src/config').mongo.uri;
const logger = require('../src/services/logger');

global.logger = logger;

let createdUser;


let werehouse;
let warehouseEntity;
let food = {
  name: 'temp',
};
let location = {
  name: 'temp',
};

let warehouseCreated;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);
  food.fkProprietario = createdUser['_id'];
  location.fkProprietario = createdUser['_id'];

  foodCreated = await Food.create(food);
  locationCreated = await Location.create(location);

  werehouse = {
    name: 'temp',
    fkProprietario: createdUser['_id']
  };

  warehouseCreated = await Warehouse.create(werehouse);

  warehouseEntity = {
    fkAlimento: foodCreated['_id'],
    fkLuogo: locationCreated['_id'],
    fkMagazzino: warehouseCreated['_id']
  };
});
afterEach(async () => {
  await User.destroy(createdUser._id);
  await Food.destroy(foodCreated._id);
  await Location.destroy(locationCreated._id);
  await Warehouse.destroy(warehouseCreated._id);
  await mongoose.disconnect();
});

let user = {
  name: 'nome',
  cognome: 'surname',
  password: 'psw',
  email: 'mail',
  phone: '123123123'
};

describe('Werehouses', () => {
  it('Werehouse no data', async () => {
    try {
      await WarehouseEntity.create(warehouseEntity);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Werehouse correct', async () => {
    let werehouseCreate;
    warehouseEntity.scadenza = new Date();
    try {
      werehouseCreate = await WarehouseEntity.create(warehouseEntity);
    } catch (err) {
      console.log(err);
    }
    expect(werehouseCreate).toBeTruthy();
    await WarehouseEntity.destroy(werehouseCreate._id);
  });
});