const { Collection, Header } = require('postman-collection');

function createCollection(name) {
  // This is the our postman collection
  const postmanCollection = new Collection({
    info: {
      name: name
    },
    // Requests in this collection
    item: [],
  });

  return postmanCollection;
}

function createFolder(name) {
  return {
    name: name,
    item: []
  };
}

function createItem(info) {
  let postmanRequest = [];
  // This string will be parsed to create header
  const rawHeaderString =
    'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

  // Parsing string to postman compatible format
  const rawHeaders = Header.parse(rawHeaderString);

  // Generate headers
  const requestHeader = rawHeaders.map((h) => new Header(h));
  // API endpoint
  const baseUrl = '{{baseUrl}}';

  info.forEach(element => {
    let body = {};
    if (element.method == 'post') {
      try {
        body = {
          mode: 'raw',
          raw: '',
        };
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }
    postmanRequest.push({
      name: `${element.name}`,
      request: {
        header: requestHeader,
        url: baseUrl + element.url,
        method: element.method,
        body: body,
        auth: null,
      }
    });
  });
  // auth: {
  //   'type': 'bearer',
  //     'basic': [],
  //       'bearer': [
  //         {
  //           'key': 'token',
  //           'value': '{{token}}',
  //           'type': 'string'
  //         }
  //       ]
  // }
  return postmanRequest;
}



module.exports = { createItem, createFolder, createCollection };