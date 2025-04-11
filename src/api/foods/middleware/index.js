import MinStockLevel from '../../min-stock-levels/model';

export async function removeMinLevel(next) {
  let foodId;

  if (this._id) {
    foodId = this._id;
  } else {
    const filter = this.getFilter ? this.getFilter() : null;
    foodId = filter && filter._id;
  }

  if (foodId) {
    const exists = await MinStockLevel.findOne({ foodId });

    if (exists) {
      await MinStockLevel.deleteOne({ foodId });
    }
  }

  return next();
}