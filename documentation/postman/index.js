import axios from 'axios';
import _ from 'lodash';
import config from '../../src/config.js';

const { postmanApi } = config;

export class Postman {

  // Create Workspace
  static async createWorkspace(name, description = '', canDuplicate = false) {
    const workspaceData = {
      workspace: {
        name,
        type: 'personal',
        description
      }
    };

    const exists = await this.getWorkspace(name);
    if (!_.isNil(exists) && !canDuplicate) {
      logger.info('Workspace already exists');
      return exists;
    }

    const response = await axios.post(
      'https://api.getpostman.com/workspaces',
      workspaceData,
      {
        headers: {
          'X-Api-Key': postmanApi,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.workspace;
  }

  // Get Workspaces or Get by Name
  static async getWorkspace(name) {
    const response = await axios.get('https://api.getpostman.com/workspaces', {
      headers: { 'X-Api-Key': postmanApi }
    });

    if (!name) return response.data.workspaces;

    return (
      response.data.workspaces.find(
        ws => ws.name.trim().toLowerCase() === name.trim().toLowerCase()
      ) || null
    );
  }

  // Create Collection
  static async createCollection(name, items = [], events = [], workspaceId) {
    if (_.isNil(workspaceId)) throw new Error('workspaceId can\'t be undefined');
    await this.deleteCollectionByName(name, workspaceId);

    const collectionData = {
      collection: {
        info: {
          name,
          schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        event: events,
        item: items
      }
    };

    const response = await axios.post(
      `https://api.getpostman.com/collections?workspace=${workspaceId}`,
      collectionData,
      {
        headers: {
          'X-Api-Key': postmanApi,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  // Get Collection
  static async getCollection(name, workspaceId) {
    if (_.isNil(workspaceId)) throw new Error('workspaceId can\'t be undefined');

    const response = await axios.get(
      `https://api.getpostman.com/collections?workspace=${workspaceId}`,
      {
        headers: {
          'X-Api-Key': postmanApi,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.workspace;
  }

  // Delete Collection
  static async deleteCollectionByName(collectionName, workspaceId) {
    try {
      // 1. Recupera tutte le collections del workspace
      const response = await axios.get(`https://api.getpostman.com/collections?workspace=${workspaceId}`, {
        headers: { 'X-Api-Key': postmanApi }
      });

      // 2. Cerca la collection con il nome specificato
      const collection = response.data.collections.find(c => c.name === collectionName);

      if (!collection) {
        return `Collection '${collectionName}' not found in workspace ${workspaceId}`;
      }

      // 3. Elimina la collection trovata
      await axios.delete(`https://api.getpostman.com/collections/${collection.uid}`, {
        headers: { 'X-Api-Key': postmanApi }
      });

      return `Collection '${collectionName}' deleted successfully`;
    } catch (error) {
      console.error('Error deleting collection:', error.response?.data || error.message);
      return null;
    }
  }

  // Create Environment
  static async createEnvironment(name, variables = [], workspaceId) {
    if (_.isNil(workspaceId)) throw new Error('workspaceId can\'t be undefined');

    const exists = this.getEnvironments(workspaceId);
    if (!_.isEmpty(exists)) {
      logger.info('Env already exists');
      return exists;
    }

    const envData = {
      environment: {
        name,
        values: variables
      }
    };

    const response = await axios.post(
      `https://api.getpostman.com/environments?workspace=${workspaceId}`,
      envData,
      {
        headers: {
          'X-Api-Key': postmanApi,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  // Get Environments
  static async getEnvironments(workspaceId = null) {
    if (_.isNil(workspaceId)) {
      const response = await axios.get('https://api.getpostman.com/environments?workspace=' + workspaceId, {
        headers: { 'X-Api-Key': postmanApi }
      });
      return response.data.environments;
    }

    const response = await axios.get('https://api.getpostman.com/environments?workspace=' + workspaceId, {
      headers: { 'X-Api-Key': postmanApi }
    });

    return response.data.environments;
  }
}

// ESEMPIO DI UTILIZZO
// (async () => {
//   try {
//     // --- Create Workspace ---
//     const workspace = await Postman.createWorkspace('TestWorkspace', 'Workspace di test');
//     logger.info('Workspace creato o esistente:', workspace);

//     // --- Create Collection ---
// const collection = await Postman.createCollection(
//   'TestCollection',
//   [
//     {
//       name: 'Sample Request',
//       request: {
//         method: 'GET',
//         header: [],
//         url: { raw: 'https://postman-echo.com/get', host: ['postman-echo', 'com'], path: ['get'] }
//       }
//     }
//   ],
// [
//   {
//     listen: 'prerequest',
//     script: {
//       exec: ['console.log('Pre-request script per la collection');'],
//       type: 'text/javascript',
//     },
//   },
//   {
//     listen: 'test',
//     script: {
//       exec: ['console.log('Test script per la collection');'],
//       type: 'text/javascript',
//     },
//   },
// ],
//   workspace.id
// );
//     logger.info('Collection creata:', collection);

//     // --- Create Environment ---
// const environment = await Postman.createEnvironment(
//   'TestEnv',
//   [
//     { key: 'API_URL', value: 'https://api.example.com', enabled: true },
//     { key: 'API_KEY', value: '123456', enabled: true }
//   ],
//   workspace.id
// );
//     logger.info('Environment creato:', environment);

//     // // --- Get Workspaces ---
//     // const allWorkspaces = await Postman.getWorkspace();
//     // logger.info('Tutti i Workspace:', allWorkspaces);

//     // // --- Get Environments ---
//     // const allEnvs = await Postman.getEnvironments(workspace.id);
//     // logger.info('Tutti gli Environment:', allEnvs);

//   } catch (error) {
//     console.error('Errore:', error.message);
//   }
// })();

export async function generatePostman(postman) {
  try {
    logger.info('Start postman workspace generation...');
    const workspace = await Postman.createWorkspace(postman.info.name, '');
    await Postman.createCollection(postman.info.name, postman.item, [
      {
        listen: 'test', // eseguilo dopo la richiesta
        script: {
          exec: ['const saveTokenUserinfo = pm.require(\'@gionni-team/save-token-userinfo\');'], // assegna uno script presente nel mio account
          type: 'text/javascript',
        },
      },
    ], workspace.id);
    await Postman.createEnvironment(
      'Dev',
      [
        { key: 'baseUrl', value: 'http://localhost:9000', enabled: true },
        { key: 'token', value: '', enabled: true }
      ],
      workspace.id
    );
    logger.info('Postman workspace generate successfully   ');
  } catch (e) {
    logger.error(e);
  }
};