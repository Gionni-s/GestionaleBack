import ShoppingList from '../../shopping-lists/model';
import Warehouse from '../../warehouse-entities/model';
import { aggregateWarehouseEntity } from '../aggregate';

export function setChangedFields(next) {
  this.wasNew = this.isNew;

  return next();
}

export async function addShoppingListElement(doc, next) {
  const storeElements = await Warehouse.aggregate(
    aggregateWarehouseEntity(doc.foodId, doc.userId)
  );

  const storeElement = storeElements[0] || { totalAmount: 0 };

  if (storeElement.totalAmount < doc.quantity) {
    const quantityToInsert = doc.quantity - storeElement.totalAmount;

    await ShoppingList.addShoppingElement(
      doc.foodId,
      quantityToInsert,
      doc.userId
    );
  }

  return next();
}
