export const RolesEnum = {
  USER: 'user',
  ADMIN: 'admin',
};

export const RecipeIngridientMeasurementUnitEnum = {
  KG: 'kg',
  G: 'g',
  L: 'l',
  ML: 'ml'
};

export const recipeIngridientMeasurement = Object.values(RecipeIngridientMeasurementUnitEnum);

export const AmountTypeEnum = {
  EUR: '€',
};

export const amountType = Object.values(AmountTypeEnum);

export const BudgetGroupExpirationIntervalEnum = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

export const budgeGroupExpirationInterval = Object.values(BudgetGroupExpirationIntervalEnum);

export const BudgetGroupTypeEnum = {
  EXPENSE: 'expense',
  SAVING: 'saving'
};

export const budgetGroupType = Object.values(BudgetGroupTypeEnum);