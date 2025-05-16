const ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
  up(db) {
    return db.collection('warehouses').insertMany([
      {
        name: 'Casa Bergamo',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      }
    ]
    );
  },

  down(db) {
    return db.collection('warehouses').deleteMany(
      {
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2')
      });
  }
};
