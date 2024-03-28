const crypto = require('crypto');

function encrypt(data) {
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16);
  const securityKey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);

  let encryptedData = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  console.log('Encrypted result:', {
    encryptedData,
    ivHex: Buffer.from(iv).toString('hex'),
    securityKeyHex: Buffer.from(securityKey).toString('hex'),
  });
}

const dataThatWantToEncrypt = {
  key: '9978b6cb-07a3-4629-ab6b-2a0a211d6825',
  type: 'forgotPassword',
  fullname: 'Risjad Muhammad Reviansyah',
  email: 'rmr@fasset.com',
  otpCode: '123321'
};
encrypt(dataThatWantToEncrypt);
