const { createCollection, createItem, createFolder } = require('./create');
const { getFoldersName, getPostmanInfo, getCallInfo } = require('./get');
const saveFile = require('./saveFile');
const { appName, postmanApi } = require('../src/config.js');
const _ = require('lodash');
const { generatePostman } = require('./postman/index.js');

const postmanCollection = createCollection(appName, false);

const folderName = getFoldersName();

const folderCollection = [];
folderName.forEach(element => {
  folderCollection[element] = createFolder(_.capitalize(element));
});

const postmanComment = getPostmanInfo(folderName);



for (const name in folderCollection) {
  const info = getCallInfo(postmanComment[name]);
  const postmanRequest = createItem(info);
  for (const i in postmanRequest) {
    folderCollection[name].item.push(postmanRequest[i]);
  }
  postmanCollection.items.add(folderCollection[name]);
}
const collectionJSON = postmanCollection.toJSON();

if (!_.isNil(postmanApi)) {
  generatePostman(collectionJSON);
} else {
  logger.error('Postman api key not present');
}

saveFile(collectionJSON);