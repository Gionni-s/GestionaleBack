function schemaGeneration(entitySchema) {
  Object.keys(entitySchema).forEach((element) => {
    const field = entitySchema[element];

    if (field.virtual) delete field.virtual;
    if (field.virtualPopulation) delete field.virtualPopulation;


    if (field.type.schemaName === 'ObjectId') {
      field.ref = capitalizeRef(element);
    }

    if (Array.isArray(field.type) && field.type.length > 0 && field.type[0]?.obj) {
      Object.keys(field.type[0].obj).forEach((sub) => {
        const subField = field.type[0].obj[sub];
        if (subField.type.schemaName === 'ObjectId') {
          subField.ref = capitalizeRef(sub);
        }
      });
    }
  });

  return entitySchema;
}

function createPopulate(entitySchema) {
  const populate = [];

  Object.keys(entitySchema).forEach((element) => {
    const field = entitySchema[element];

    // Se il campo ha una ref, lo popoleremo
    if (!_.isNil(field.ref) && !field.virtual) {
      populate.push({ path: element });
    }

    // Se il campo è un array di oggetti (come 'ingridients')
    if (Array.isArray(field.type) && field.type.length > 0 && field.type[0]?.obj) {
      Object.keys(field.type[0].obj).forEach((sub) => {
        const subField = field.type[0].obj[sub];

        // Se c'è un riferimento (ref) anche nel campo annidato, lo popoliamo
        if (!_.isNil(subField.ref)) {
          populate.push({ path: `${element}.${sub}`, model: subField.ref });
        }
      });
    }
  });

  return populate;
}


function createVirtual(entitySchema) {
  const populate = [];

  Object.keys(entitySchema).forEach((element) => {
    const field = entitySchema[element];

    // Se il campo ha una ref, lo popoleremo
    if (!_.isNil(field.ref) && !field.virtual) {
      populate.push({ path: element });
    }

    // Se il campo è un array di oggetti (come 'ingridients')
    if (Array.isArray(field.type) && field.type.length > 0 && field.type[0]?.obj) {
      Object.keys(field.type[0].obj).forEach((sub) => {
        const subField = field.type[0].obj[sub];

        // Se c'è un riferimento (ref) anche nel campo annidato, lo popoliamo
        if (!_.isNil(subField.ref)) {
          populate.push({ path: `${element}.${sub}`, model: subField.ref });
        }
      });
    }
  });

  return populate;
}

function capitalizeRef(name) {
  return name.charAt(0).toUpperCase() + name.slice(1, -2);
}

module.exports = { schemaGeneration, createPopulate, createVirtual };
