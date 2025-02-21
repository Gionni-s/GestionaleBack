const { schemaGeneration, createPopulate, createVirtuals } = require('./_utils');

function ModelGenerator(mongoose) {
  return function (modelParams) {
    const {
      schema: entitySchema,
      collectionName,
      modelName,
      extensionFunction // funzione (schema)=>{}
    } = modelParams;

    let schema = schemaGeneration(entitySchema);

    if (extensionFunction) {
      extensionFunction(schema);
    }

    if (mongoose.models[modelName]) {
      delete mongoose.models[modelName];
    }

    let model = mongoose.model(modelName, schema);

    const view = async (filter = {}) => {
      return await model.find(filter).populate(createPopulate(entitySchema));
      // return await model.find(filter);
    };

    model.view = view;

    return model;
  };
}

module.exports = ModelGenerator;
