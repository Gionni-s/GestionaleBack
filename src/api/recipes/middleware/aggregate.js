var ObjectId = require('mongoose').Types.ObjectId;

const populate = (fkBook) => {
  return [
    {
      $match: { "fkBook": new ObjectId(fkBook) }
    },
    {
      $lookup: {
        from: 'foods',
        localField: 'ingridients.fkFood',
        foreignField: '_id',
        as: 'foods'
      },
    },
    { $unwind: "$foods" },
    { $set: { "ingridients.fkFood": "$foods.name" } },
    {
      $project: {
        "__v": 0,
        "foods": 0,
        "ingridients._id": 0,
      }
    }
  ]
}

module.exports = populate