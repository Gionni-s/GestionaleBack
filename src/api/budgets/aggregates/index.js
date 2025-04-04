import moment from 'moment';
import { Types } from 'mongoose';

export const getActiveBudgetGroupAggregate = (ids, userId) => {
  const today = moment().toDate();
  return [
    {
      $match: {
        $or: [
          {
            'validationPeriod.start': { $lte: today },
            'validationPeriod.end': { $gte: today }
          },
          {
            'validationPeriod.start': { $gte: today },
            'validationPeriod.end': { $lte: today },
          },
          // {
          //   'validationPeriod.start': { $gte: today },
          //   'validationPeriod.end': { $gte: today }
          // }
        ]
      }
    },
    {
      $match: {
        userId: new Types.ObjectId(userId),
        budgetGroupTemplateId: {
          $in: ids.map(val => new Types.ObjectId(val))
        }
      }
    }
  ];
};

export const getKpiAggregate = (ids, userId) => {
  const today = moment().toDate();
  return [
    {
      $match: {
        userId: new Types.ObjectId(userId),
        _id: {
          $in: ids.map(val => new Types.ObjectId(val))
        }
      }
    },
    {
      $lookup: {
        from: 'budget-groups',
        localField: '_id',
        foreignField: 'budgetGroupTemplateId',
        pipeline: [
          {
            $match: {
              $or: [
                {
                  'validationPeriod.start': { $lte: today },
                  'validationPeriod.end': { $gte: today }
                },
                {
                  'validationPeriod.start': { $gte: today },
                  'validationPeriod.end': { $lte: today },
                },
                // {
                //   'validationPeriod.start': { $gte: today },
                //   'validationPeriod.end': { $gte: today }
                // }
              ]
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
            $addFields: {
              total: {
                $sum: '$budgets.amount'
              }
            }
          }
        ],
        as: 'budgetGroups'
      }
    },
    {
      $unwind: {
        path: '$budgetGroups',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        name: 1,
        max: 1,
        total: {
          $ifNull: ['$budgetGroups.total', 0]
        }
      }
    }
  ];
};