import { schemaGeneration, createPopulate } from './_utils';

export default function ModelGenerator(mongoose) {
  return function (modelParams) {
    const {
      schema: entitySchema,
      collectionName,
      modelName,
      timeSeries = {},
      extensionFunction, // function (schema) => {}
    } = modelParams;

    let { schema, virtuals } = schemaGeneration(entitySchema, timeSeries);

    if (extensionFunction) {
      extensionFunction(schema);
    }

    const populate = createPopulate(entitySchema, virtuals);

    schema.methods.view = async function () {
      const populated = await this.populate(populate);
      return populated.toObject({ virtuals: true, getters: true, setters: true });
    };

    if (mongoose.models[modelName]) {
      delete mongoose.models[modelName];
    }

    const model = mongoose.model(modelName, schema, collectionName);

    model.find = function (filter = {}, projections = {}, options = {}) {
      return mongoose.Model.find.call(this, filter, projections, options);
    };

    model.findOne = function (filter = {}, projections = {}, options = {}) {
      return mongoose.Model.findOne.call(this, filter, projections, options);
    };

    return model;
  };
}
