const ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
  up(db) {
    return db.collection('locations').insertMany([
      {
        name: 'Frigo',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      },
      {
        name: 'Dispensa',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      },
      {
        name: 'Mobile',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      }]
    );
  },

  down(db) {
    return db.collection('locations').deleteMany(
      {
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2')
      });
  }
};
