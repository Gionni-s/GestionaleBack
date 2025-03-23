let ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
  up(db) {
    return db.collection('food-groups').insertMany([
      {
        name: 'Sugo',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      },
      {
        name: 'Pasta',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      },
      {
        name: 'Carne',
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2'),
      }]
    );
  },

  down(db) {
    return db.collection('food-groups').deleteMany(
      {
        fkProprietario: new ObjectID('59e90ce61d2d521ffc7c1fb2')
      });
  }
};
