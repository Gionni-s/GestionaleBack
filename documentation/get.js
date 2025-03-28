const fs = require('fs');
const appRoute = require('app-root-path');
const { parsePostmanInfo } = require('./parser');
const _ = require('lodash');

function getFoldersName() {
  return fs.readdirSync(appRoute.toString() + '/src/api')
    .filter(a => !a.startsWith('_') && !a.endsWith('.js'));
}

function getPostmanInfo(names) {
  let val = {};

  names.forEach(name => {
    val[name] = [];
    try {
      const filePath = appRoute.toString() + '/src/api/' + name + '/index.js';
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Estrai i blocchi di commenti che iniziano con /**
      const commentBlocks = fileContent.match(/\/\*\*[\s\S]*?\*\//g) || [];

      // Filtra i blocchi di commenti per includere solo quelli che contengono @api
      const apiComments = commentBlocks.filter(block => block.includes('@api'));
      for (let i in apiComments) {
        apiComments[i] = parsePostmanInfo(apiComments[i]);
      }

      val[name].push(...apiComments);
    } catch (err) {
      logger.error(`Errore nella lettura del file per ${name}:`, err);
    }
  });
  return val;
}

function getCallInfo(val) {
  let result = [];
  val.forEach(element => {
    let mainLine = element[0];
    mainLine = mainLine.split(' ');
    mainLine.shift();
    result.push({
      method: mainLine.shift().replace('{', '').replace('}', ''),
      url: mainLine.shift(), name: _.join(mainLine, [separator = ' '])
    });
  });
  return result;
}

module.exports = { getFoldersName, getPostmanInfo, getCallInfo };