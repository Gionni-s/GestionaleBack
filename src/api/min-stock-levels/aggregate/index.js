export function aggregateWarehouseEntity(foodId, userId) {
  return [
    {
      $group: {
        _id: {
          foodId: foodId,
          userId: userId
        },
        totalAmount: {
          $sum: '$quantity'
        }
      }
    }
  ];
}