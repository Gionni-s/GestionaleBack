var ObjectId = require('mongoose').Types.ObjectId;

const populate = (idProprietario) => {
  return [
    {
      $match: { "fkProprietario": new ObjectId(idProprietario) }
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: 'fkBook',
        as: 'recipes'
      },
    },
    {
      $project: {
        "__v": 0,
        "recipes.ingridients": 0,
        "recipes.fkBook": 0,
        "recipes.__v": 0
      }
    }
  ]
}

module.exports = populate