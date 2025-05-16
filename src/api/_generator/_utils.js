const { Schema } = require('mongoose');

const isArrayOfObjects = (field) =>
  Array.isArray(field.type) && field.type.length > 0 && field.type[0]?.obj;

const capitalizeRef = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1, -2);

export function schemaGeneration(entitySchema, timeSeries) {
  const virtuals = createVirtuals(entitySchema);

  Object.keys(entitySchema).forEach(key => {
    if (entitySchema[key].virtual) {
      delete entitySchema[key];
    }
  });

  Object.entries(entitySchema).forEach(([element, field]) => {
    delete field.virtual;
    delete field.virtualPopulation;

    if (field.type?.schemaName === 'ObjectId') {
      field.ref = capitalizeRef(element);
    }

    if (isArrayOfObjects(field)) {
      Object.entries(field.type[0].obj).forEach(([sub, subField]) => {
        if (subField.type?.schemaName === 'ObjectId') {
          subField.ref = capitalizeRef(sub);
        }
      });
    }
  });
  const schema = new Schema(entitySchema, { ...timeSeries, timestamps: { createdAt: 'createdAt' } });

  virtuals.forEach(val => {
    schema.virtual(val.as, val.options);
  });

  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });

  return { schema, virtuals };
}

export function createPopulate(entitySchema, virtuals) {
  const populate = [];

  virtuals.forEach(val => {
    const populateBody = { path: val.as };

    if (val.populate) {
      populateBody.populate = { path: val.populate };
    }

    populate.push(populateBody);
  });
  return populate;
}

export function createVirtuals(entitySchema) {
  const virtuals = [];

  Object.entries(entitySchema).forEach(([elementName, field]) => {
    if (field.virtualPopulation) {
      const virPop = field.virtualPopulation;
      virtuals.push({
        as: field.virtual ? elementName : virPop.as || `${elementName.slice(0, -2)}`,
        options: virPop.options,
        autoPopulate: virPop.odinAutoPopulation,
        populate: virPop.options?.options?.populate
      });
    }
  });
  return virtuals;
}