const axios = require('axios');
require('dotenv').config();

let secretKey = null;
let lastUpdatedAt = null;

async function ensureValidSecretKey() {
  const now = Date.now();

  // Si clé absente ou plus vieille que 23h, on la renouvelle
  if (!secretKey || (now - lastUpdatedAt > 23 * 60 * 60 * 1000)) {
    const response = await axios.post(
      `${process.env.PVIT_BASE_URL}/J1LSIRLJY6UGC4PA/renew-secret`,
      {
        operationAccountCode: process.env.PVIT_ACCOUNT_ID,
        receptionUrlCode:process.env.PVIT_SECRET_KEY,
        password: process.env.PASSWORD
      }
    );

    if (response.data.secret_key) {
      secretKey = response.data.secret_key;
      lastUpdatedAt = now;
      console.log('🔑 Nouvelle clé secrète PVIT générée automatiquement.');
    } else {
      throw new Error('Aucune clé secrète reçue depuis PVIT.');
    }
  }
}

function getSecretKey() {
  return secretKey;
}

module.exports = {
  ensureValidSecretKey,
  getSecretKey
};
