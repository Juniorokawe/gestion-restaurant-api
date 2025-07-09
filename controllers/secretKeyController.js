const axios = require('axios');
const qs = require('qs');
let secretKey = null;
let lastUpdatedAt = null;

exports.renewSecretKey = async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PVIT_BASE_URL}/J1LSIRLJY6UGC4PA/renew-secret`,
      qs.stringify({
        operationAccountCode: process.env.PVIT_ACCOUNT_ID,
        receptionUrlCode: process.env.PVIT_SECRET_KEY,
        password: process.env.PASSWORD,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    secretKey = response.data.secret_key;
    lastUpdatedAt = Date.now();

    console.log('🔐 Nouvelle clé secrète récupérée :', secretKey);

    res.status(200).json({
      success: true,
      message: '✅ Clé secrète renouvelée avec succès',
      secretKey
    });

  } catch (err) {
    console.error('❌ Erreur lors du renouvellement manuel de la clé :', err.message);
    res.status(500).json({
      success: false,
      message: '❌ Échec du renouvellement de la clé secrète',
      error: err.message,
    });
  }
};
