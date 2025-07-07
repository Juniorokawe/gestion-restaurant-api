const axios = require('axios');

let cachedSecretKey = null;

async function ensureValidSecretKey() {
  if (!cachedSecretKey) {
    const response = await axios.post(`${process.env.PVIT_BASE_URL}/J1LSIRLJY6UGC4PA/key/generate`, {
      code: process.env.CODEURLCALLBACK,
      key: process.env.CODEURLCALLBACKKEY
    });
    cachedSecretKey = response.data.secret_key;
  }
}

module.exports = {
  ensureValidSecretKey,
  cachedSecretKey
};
