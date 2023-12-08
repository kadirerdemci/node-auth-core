// src/utils/cryptoUtils.js

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = process.env.CRYPTO_KEY; // Bu değeri .env dosyanızdan alın

const encrypt = (text) => {
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
