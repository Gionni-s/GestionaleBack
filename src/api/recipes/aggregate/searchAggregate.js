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
        'ingredients.foodId': {
          $in: validFoodIds
        }
      }
    },
    { $unwind: '$ingredients' },
    {
      $lookup: {
        from: 'food-group',
        localField: 'ingredients.foodId',
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
        ingredients: {
          $push: {
            _id: '$foodDetails._id',
            name: '$foodDetails.name',
            quantity: '$ingredients.quantity'
          }
        },
        __v: { $first: '$__v' }
      }
    }
  ];
};