import { Schema } from 'querymen';

export default function ValidateSchema(mongooseSchema) {
  let query = {};

  function parseSchema(schema, path = '') {
    if (schema.paths) {
      for (const [key, pathConfig] of Object.entries(schema.paths)) {
        const fullPath = path ? `${path}.${key}` : key;

        if (pathConfig.instance) {
          query[fullPath] = mapType(pathConfig.instance);
        } else if (pathConfig.schema) {
          parseSchema(pathConfig.schema, fullPath);
        } else if (pathConfig.caster && pathConfig.caster.instance) {
          query[fullPath] = { type: `[${mapType(pathConfig.caster.instance)}]` };
        }
      }
    }
    else {
      for (const [key, value] of Object.entries(schema)) {
        const fullPath = path ? `${path}.${key}` : key;

        if (value.type) {
          const typeStr = value.type.name || (value.type.schemaName ? 'ObjectId' : value.type.toString());
          query[fullPath] = { type: mapType(typeStr) };
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          parseSchema(value, fullPath);
        }
      }
    }
  }

  function mapType(type) {
    const typeMap = {
      'String': 'string',
      'Number': 'number',
      'Boolean': 'boolean',
      'Date': 'date',
      'SchemaObjectId': 'objectId',
      'Array': 'array',
      'Mixed': 'mixed'
    };
    return typeMap[type] || 'unknown';
  }

  parseSchema(mongooseSchema);

  return { create: {}, query: new Schema(query) };
}