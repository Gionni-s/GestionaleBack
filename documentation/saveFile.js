const fs = require('fs');
const appRoute = require('app-root-path');

function saveFile(collectionJSON) {
  let dir = appRoute.toString() + '/docs';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('Create folder --> ' + dir);
  } else {
    console.log('Update file ' + dir);
  }
  // Create a colleciton.json file. It can be imported to postman
  fs.writeFile(dir + '/postman.json', JSON.stringify(collectionJSON), (err) => {
    if (err) { console.log(err); }
    console.log('File saved');
  });
}

module.exports = saveFile;