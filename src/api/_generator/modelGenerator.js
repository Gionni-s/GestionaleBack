const { schemaGeneration, createPopulate } = require('./_utils');

function ModelGenerator(mongoose) {
  return function (modelParams) {
    const {
      schema: entitySchema,
      collectionName,
      modelName,
      extensionFunction // funzione (schema)=>{}
    } = modelParams;

    let { schema, virtuals } = schemaGeneration(entitySchema);

    if (extensionFunction) {
      extensionFunction(schema);
    }

    if (mongoose.models[modelName]) {
      delete mongoose.models[modelName];
    }

    let model = mongoose.model(modelName, schema);

    const view = async (filter = {}) => {
      const populate = createPopulate(entitySchema, virtuals);
      return await model.find(filter).populate(populate);
    };

    model.view = view;

    return model;
  };
}

module.exports = ModelGenerator;
