export async function addShoppingElement(foodId, quantity, userId) {
  const shoppingListElement = await this.find({ foodId, userId: userId }).lean();

  if (!_.isEmpty(shoppingListElement)) {
    return;
  }

  return await this.create({ foodId, quantity, userId: userId });
}