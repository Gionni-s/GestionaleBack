const { default: mongoose } = require('mongoose');

const searchAggregate = (foodIds) => [
  {
    $match: {
      'ingridients.fkFood': {
        $in: foodIds.map(val => new mongoose.Types.ObjectId(val))
      }
    }
  },
  { $unwind: '$ingridients' },
  {
    $lookup: {
      from: 'foods',
      localField: 'ingridients.fkFood',
      foreignField: '_id',
      as: 'foodDetails'
    }
  },
  { $unwind: '$foodDetails' },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      fkBook: { $first: '$fkBook' },
      fkProprietario: {
        $first: '$fkProprietario'
      },
      ingridients: {
        $push: {
          _id: '$foodDetails._id',
          name: '$foodDetails.name',
          quantity: '$ingridients.quantity'
        }
      },
      __v: { $first: '$__v' }
    }
  }
];

module.exports = searchAggregate;