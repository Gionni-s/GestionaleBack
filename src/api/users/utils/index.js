import fs from 'fs';
import appRoute from 'app-root-path';

export function basicAuth(auth) {
  const authorization = auth.split(' ')[1];
  const decript = (value) => Buffer.from(value, 'base64').toString();
  const result = decript(authorization);
  const mail = result.split(':')[0];
  const psw = result.slice(result.indexOf(':') + 1, result.length);
  return { mail, psw };
}

export function convertImageToBase64(name) {
  const data = fs.readFileSync(appRoute.toString() + '/src' + name);
  const base64Image = Buffer.from(data, 'binary').toString('base64');
  return 'data:image/jpeg;base64,' + base64Image;
}