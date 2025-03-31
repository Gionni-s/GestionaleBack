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
        total: { $sum: '$budgets.amount' }
      }
    },
    {
      $project: {
        name: 1,
        max: 1,
        total: 1
      }
    }
  ];
};