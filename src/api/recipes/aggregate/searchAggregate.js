import { Schema } from 'mongoose';

export const searchAggregate = (foodIds) => {
  const validFoodIds = foodIds.filter(id => {
    try {
      return /^[0-9a-fA-F]{24}$/.test(id);
    } catch (error) {
      return false;
    }
  }).map(id => new Schema.ObjectId(id).path);

  return [
    {
      $match: {
        'ingridients.foodId': {
          $in: validFoodIds
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
        userId: { $first: '$userId' },
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
};