const axios = require('axios');
const qs = require('qs'); // à ajouter si tu utilises qs.stringify
require('dotenv').config();

let secretKey = null;
let lastUpdatedAt = null;

async function ensureValidSecretKey() {
  const now = Date.now();

  if (!secretKey || (now - lastUpdatedAt > 23 * 60 * 60 * 1000)) {
    try {
      const response = await axios.post(
        `${process.env.PVIT_BASE_URL}/J1LSIRLJY6UGC4PA/renew-secret`,
        qs.stringify({
          operationAccountCode: process.env.PVIT_ACCOUNT_ID,
          receptionUrlCode: process.env.PVIT_SECRET_KEY,
          password: process.env.PASSWORD,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      // Mise à jour de la clé et du timestamp
      secretKey = response.data.secretKey;
      lastUpdatedAt = now;
      console.log("✅ Nouvelle clé secrète récupérée :", secretKey);
    } catch (error) {
      console.error("❌ Erreur lors du renouvellement de la clé :", error.response?.data || error.message);
      throw error;
    }
  }
}

function getSecretKey() {
  return secretKey;
}

module.exports = {
  ensureValidSecretKey,
  getSecretKey,
};
