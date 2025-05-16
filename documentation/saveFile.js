const fs = require('fs');
const appRoute = require('app-root-path');

function saveFile(collectionJSON) {
  const dir = appRoute.toString() + '/docs';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    logger.info('Create folder --> ' + dir);
  } else {
    logger.info('Update file ' + dir);
  }
  // Create a colleciton.json file. It can be imported to postman
  fs.writeFile(dir + '/postman.json', JSON.stringify(collectionJSON), (err) => {
    if (err) { logger.error(err); }
    logger.info('File saved');
  });
}

module.exports = saveFile;