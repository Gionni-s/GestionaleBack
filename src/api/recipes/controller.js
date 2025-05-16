import FunctionGeneration from '../_generator/function.js';
import Entity from './model';
import WarehouseEntities from '../warehouse-entities/model.js';
import RecipeIngredients from '../recipe-ingredients/model';
import moment from 'moment';
import { generateBulkOperations } from '../_utils/function.js';

const actions = FunctionGeneration(Entity);

actions.create = async ({ body, user }, res) => {
  try {
    const bodyCopy = { ...body };
    delete body.ingredients;

    const recipe = await Entity.create({ ...body, userId: user._id });
    const ingredients = bodyCopy.ingredients.map(ing => ({ ...ing, userId: user._id, recipeId: recipe._id }));
    const bulkOps = generateBulkOperations(ingredients);

    await RecipeIngredients.bulkWrite(bulkOps);
    const newRecipe = await Entity.find({ _id: recipe._id, userId: user._id });
    return res.status(200).send(newRecipe);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.update = async ({ params: { id }, user, body }, res) => {
  try {
    const bodyClone = { ...body };
    delete bodyClone.ingredients;

    await Entity.updateOne({ _id: id, userId: user._id }, bodyClone);

    const existingIngredients = await RecipeIngredients.find({ recipeId: id, userId: user._id });

    if (_.isEmpty(body.ingredients)) {
      await RecipeIngredients.deleteMany({ recipeId: id, userId: user._id });
    } else {
      const ingredientsArray = body.ingredients.map(ing => ({
        ...ing,
        recipeId: id,
        userId: user._id
      }));


      if (!_.isEmpty(existingIngredients)) {
        await RecipeIngredients.deleteMany({ recipeId: id, userId: user._id });
      }
      await RecipeIngredients.insertMany(ingredientsArray);
    }

    const updatedRecipe = await Entity.findOne({ _id: id, userId: user._id });

    return res.status(200).json(updatedRecipe);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.destroy = async ({ params: { id }, user }, res) => {
  await Entity.deleteOne({ _id: id, userId: user._id });
  await RecipeIngredients.deleteMany({ recipeId: id, userId: user._id });
  return res.status(200).send('Item successfully deleted');
};

actions.searchRecipe = async ({ query: { foodIds } }, res) => {
  try {
    const foodIdsJson = JSON.parse(foodIds);
    const result = await Entity.find({ 'ingredients.foodId': { $in: foodIdsJson } });
    return res.status(200).send({ foodIdsJson, result });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.searchRecipeForExpiringFoods = async ({ query: { fromDate, toDate }, user }, res) => {
  try {
    if (_.isNil(fromDate)) {
      fromDate = moment().toDate();
    }
    if (_.isNil(toDate)) {
      toDate = moment().add(10, 'day').toDate();
    }
    const today = moment(fromDate).startOf('day').toDate();
    const tenDaysFromNow = moment(toDate).startOf('day').toDate();

    const warehouseEntity = await WarehouseEntities.find(
      {
        scadenza: {
          $gte: today,
          $lte: tenDaysFromNow
        },
        userId: user._id
      },
      { foodId: 1 }
    );
    const foodIds = warehouseEntity.map(val => val.foodId);
    const result = await Entity.find({ 'ingredients.foodId': { $in: foodIds } });
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

export { actions };