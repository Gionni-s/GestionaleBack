const show = () => [
  [
    {
      $lookup: {
        from: 'foods',
        localField: 'fkFood',
        foreignField: '_id',
        as: 'food'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'fkLocation',
        foreignField: '_id',
        as: 'location'
      }
    },
    {
      $lookup: {
        from: 'warehouses',
        localField: 'fkWarehouse',
        foreignField: '_id',
        as: 'warehouse'
      }
    },
    {
      $addFields: {
        food: {
          $arrayElemAt: ['$food', 0]
        },
        location: {
          $arrayElemAt: ['$location', 0]
        },
        warehouse: {
          $arrayElemAt: ['$warehouse', 0]
        }
      }
    }
  ]
];

module.exports = { show };