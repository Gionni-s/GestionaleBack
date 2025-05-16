export function aggregateWarehouseEntity(foodId, userId) {
  return [
    {
      $group: {
        _id: {
          foodId,
          userId
        },
        totalAmount: {
          $sum: '$quantity'
        }
      }
    }
  ];
}