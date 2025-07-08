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
      qs.stringify({
        operationAccountCode: process.env.PVIT_ACCOUNT_ID,
        receptionUrlCode:process.env.PVIT_SECRET_KEY,
        password: process.env.PASSWORD
      }),
      {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    );
    }
  }
  //
   await new Promise(resolve => setTimeout(resolve, 2000));
            if (!SecretKey) {
                throw new Error('La clé secrète n\'a pas été reçue via le callback après le renouvellement.');
            }



function getSecretKey() 
{
 return secretKey;
}

module.exports = {
  ensureValidSecretKey,
  getSecretKey
};
