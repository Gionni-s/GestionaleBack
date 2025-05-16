export async function addShoppingElement(foodId, quantity, userId) {
  const shoppingListElement = await this.find({ foodId, userId }).lean();

  if (!_.isEmpty(shoppingListElement)) {
    return null;
  }

  return await this.create({ foodId, quantity, userId });
}