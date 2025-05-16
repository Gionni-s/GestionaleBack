import Entity from '../model';
import bcrypt from 'bcrypt';

export async function addUser({ name, surname, psw, mail, phone }) {
  const saltRounds = bcrypt.genSaltSync(10);

  //crypted password
  const hashPassword = await bcrypt.hash(psw, saltRounds);

  //controllo se esiste già un utente con quella mail nel db
  const result = await Entity.findOne({ 'psw': hashPassword, 'email': mail });

  //controllo che non esista nessun utente con quella mail
  if (!_.isNil(result)) {
    throw new Error('é già presente un utente con la mail ' + mail);
  }


  //inserisco l'utente nel db
  const risultato = await Entity.create({
    name,
    surname,
    email: mail,
    password: hashPassword,
    phoneNumber: phone,
    lastLogin: new Date()
  });

  return risultato;
}

export async function findUser({ mail, psw }) {
  const user = await Entity.findOne({ 'email': mail }).select('+password');

  if (_.isNil(user)) {
    throw ({ code: 1000, status: 201, message: '' });
  }

  const hash = user.password;
  if (!await bcrypt.compare(psw, hash)) {
    throw ({ code: 1000, status: 400, message: 'Password o/e Email corretta' });
  }

  return user;
}

export async function deleteUser(user) {
  return (await Entity.deleteOne({ '_id': user['_id'] }));
}