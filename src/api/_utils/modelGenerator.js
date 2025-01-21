
function ModelGenerator(mongoose) {
  return function (modelParams) {
    const {
      schema: entitySchema,
      collectionName,
      modelName
    } = modelParams;

    let model = mongoose.model(modelName, entitySchema);

    const view = async (filter = {}) => {
      for (let i in filter) {
        if (i.endsWith('Id') || i == '_id') {
          filter[i] = new mongoose.Types.ObjectId(filter[i]);
        }
      }
      return await model.aggregate(createAggregate(entitySchema, { filter }));
    };
    model.view = view;

    return model;
  };
}

function createAggregate(keys, { filter = {} }) {
  const lookup = [];
  const addField = { '$addFields': {} };

  for (let i in keys) {
    if (i.endsWith('Id') || i.endsWith('Ids')) {
      lookup.push(
        {
          $lookup: {
            from: i.slice(0, -2) + 's',
            localField: i,
            foreignField: '_id',
            as: i.slice(0, -2)
          }
        }
      );
      addField['$addFields'][i.slice(0, -2)] = { $arrayElemAt: ['$' + i.slice(0, -2), 0] };
    }
  };
  if (filter != {}) {
    return [{ '$match': filter }, ...lookup, addField];
  }

  return [...lookup, addField];
}

module.exports = ModelGenerator;