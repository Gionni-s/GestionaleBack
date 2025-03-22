import mongoose from 'mongoose';

export const kpiAggregate = (user) => [
  {
    $match: {
      userId: new mongoose.Types.ObjectId(user._id)
    }
  },
  {
    $lookup: {
      from: 'budgets',
      localField: '_id',
      foreignField: 'groupId',
      pipeline: [
        {
          $group: {
            _id: '$groupId',
            total: {
              $sum: '$amount'
            }
          }
        }
      ],
      as: 'budgets'
    }
  },
  {
    $unwind: {
      path: '$budgets',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: '$_id',
      name: '$name',
      total: { $ifNull: ['$budgets.total', 0] },
      max: '$max',
      userId: '$userId'
    }
  }
];

export const chartAggregate = (user) => [
  {
    $match: {
      userId: new mongoose.Types.ObjectId(user._id)
    }
  },
  {
    $lookup: {
      from: 'budgets',
      localField: '_id',
      foreignField: 'groupId',
      as: 'budgets'
    }
  },
  {
    $unwind: {
      path: '$budgets',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: '$_id',
      name: {
        $first: '$name'
      },
      budget: {
        $push: '$budgets'
      }
    }
  },
  {
    $sort: {
      name: 1
    }
  }
];