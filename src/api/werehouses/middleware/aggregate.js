var ObjectId = require('mongoose').Types.ObjectId;

const populate = (idProprietario) => {
  return [
    {
      $match: { "fkProprietario": new ObjectId(idProprietario) }
    },
    {
      $lookup: {
        from: 'warehouseentities',
        localField: '_id',
        foreignField: 'fkMagazzino',
        as: 'Stock'
      }
    },
    { $unwind: "$Stock" },
    {
      $lookup: {
        from: "foods",
        localField: "Stock.fkAlimento",
        foreignField: "_id",
        as: "alimento"
      }
    },
    { $unwind: "$alimento" },
    { $set: { "Stock.fkAlimento": "$alimento.name" } },
    {
      $lookup: {
        from: "locations",
        localField: "Stock.fkLuogo",
        foreignField: "_id",
        as: "luogo"
      }
    },
    { $unwind: "$luogo" },
    { $set: { "Stock.fkLuogo": "$luogo.name" } },
    {
      $group: {
        _id: {
          fkAlimento: "$Stock.fkAlimento",
          fkLuogo: "$Stock.fkLuogo",
          fkMagazzino: "$Stock.fkMagazzino",
          scadenza: "$Stock.scadenza"
        },
        count: { $sum: 1 },
        doc: { $first: "$Stock" },
        originalId: { $first: "$_id" },
        originalName: { $first: "$name" },
        originalFkProprietario: { $first: "$fkProprietario" },
        originalV: { $first: "$__v" }
      }
    },
    {
      $set: {
        "doc.count": "$count"
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          _id: "$originalId",
          name: "$originalName",
          fkProprietario: "$originalFkProprietario",
          __v: "$originalV",
          Stock: "$doc"
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        fkProprietario: { $first: "$fkProprietario" },
        __v: { $first: "$__v" },
        Stock: { $push: "$Stock" }
      }
    }
  ]
}

module.exports = populate