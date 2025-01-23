const { default: mongoose } = require('mongoose');

const searchAggregate = (foodIds) => [
  {
    $match: {
      'ingridients.foodId': {
        $in: foodIds.map(val => new mongoose.Types.ObjectId(val))
      }
    }
  },
  { $unwind: '$ingridients' },
  {
    $lookup: {
      from: 'foods',
      localField: 'ingridients.foodId',
      foreignField: '_id',
      as: 'foodDetails'
    }
  },
  { $unwind: '$foodDetails' },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      bookId: { $first: '$bookId' },
      userId: {
        $first: '$userId'
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


const populateAggregate = (userId) => [
  {
    $match: {
      userId: new mongoose.Types.ObjectId(userId)
    }
  },
  {
    $lookup: {
      from: 'foods',
      localField: 'ingridients.foodId',
      foreignField: '_id',
      pipeline: [{ $project: { name: 1 } }],
      as: 'foodDetails'
    }
  },
  {
    $lookup: {
      from: 'cookbooks',
      localField: 'cookbookId',
      foreignField: '_id',
      as: 'bookInfo'
    }
  },
  {
    $unwind: '$ingridients'
  },
  {
    $addFields: {
      'ingridients.name': {
        $arrayElemAt: [
          {
            $filter: {
              input: '$foodDetails',
              cond: {
                $eq: [
                  '$$this._id',
                  '$ingridients.foodId'
                ]
              }
            }
          },
          0
        ]
      }
    }
  },
  {
    $set: {
      'ingridients.name': '$ingridients.name.name'
    }
  },
  {
    $unwind: '$bookInfo'
  },
  {
    $group: {
      _id: '$_id',
      ingridients: { $push: '$ingridients' },
      name: { $first: '$name' },
      userId: { $first: '$userId' },
      book: { $first: '$bookInfo' },
      __v: { $first: '$__v' }
    }
  }
];


module.exports = { searchAggregate, populateAggregate };