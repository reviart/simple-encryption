const crypto = require('crypto');

function hexToBuffer(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

function decrypt({encryptedData, ivHex, securityKeyHex}) {
  const algorithm = 'aes-256-cbc';
  const iv = hexToBuffer(ivHex);
  const securityKey = hexToBuffer(securityKeyHex);
  const decipher = crypto.createDecipheriv(algorithm, securityKey, iv);

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');

  console.log('Decrypted message:', JSON.parse(decryptedData));
}

decrypt({
  encryptedData: '14d861725a96575c32952549c36d570d94647adee0b3ec6a5c9223ffec76b4cf46c1603a386d87b5fcc4fc4b1412aabae5c1f7c0237c9788ddeb6ac1256f8f7714dfb006402d72dc3b4bef97c4f886b050285553e58fef0814765789bb9b42927423dca6da292bbd681e66d01c14dd30ce38a9e4343824e86839c091f1ca53e4992d0112adefcef3271ece6b55e754f8ae972cca463d8f6f0de367a8c75598e3',
  ivHex: '8a6fae12a50331dc9905b4157c2a9e1e',
  securityKeyHex: 'ca03dc62287c39da82ec07b5a62fe42b54e0ece1433a8339fbaeac227fcaa584'
});
