import fs from 'fs/promises';
import md5 from 'md5';
import path from 'path';
import {v4 as uuidV4} from 'uuid';
import CryptoJS from 'crypto-js';

const {PASSWORD_SECRET, TOKEN_SECRET} = process.env;

export function getDataPath(dirPath) {
  return path.resolve(process.cwd(), 'data', dirPath);
}

const usersFile = getDataPath('users.json');

export async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export async function writeJSON(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

export async function findById(id) {
  const users = await readJSON(usersFile);

  return users.find(user => user.id === id) || null;
}

export async function findByEmail(email) {
  const users = await readJSON(usersFile);

  return users.find(user => user.email === email) || null;
}

export async function checkEmailUnique(email) {
  const users = await readJSON(usersFile);

  return !!(users.find(user => user.email === email));
}

export async function create(data) {
  const users = await readJSON(usersFile);

  const newUser = {
    ...data,
    id: uuidV4(),
  };

  users.push(newUser);

  await writeJSON(usersFile, users);

  return newUser;
}

export async function update(id, data) {
  const users = await readJSON(usersFile);

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex > -1) {
    users[userIndex] = { ...(users[userIndex] || {}), ...data};
  } else {
    return null;
  }

  await writeJSON(usersFile, users);

  return users[userIndex];
}

export function hashPassword(pass) {
  return md5(md5(pass) + PASSWORD_SECRET);
}

export async function encrypt(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    TOKEN_SECRET,
  ).toString();
}

export async function decrypt(cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, TOKEN_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default {
  getDataPath,
  readJSON,
  writeJSON,
  findById,
  findByEmail,
  checkEmailUnique,
  create,
  update,
  hashPassword,
  encrypt,
  decrypt,
}