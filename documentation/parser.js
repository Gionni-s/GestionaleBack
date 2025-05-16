const _ = require('lodash');

function parsePostmanInfo(val) {
  val = (val.substring(3, val.length - 3)).trim();
  let newArray = val.split('*');

  for (const i in newArray) {
    newArray[i] = newArray[i].replace('\r\n', '').trim();
  }

  newArray = _.compact(newArray);

  return newArray;
}

module.exports = { parsePostmanInfo };