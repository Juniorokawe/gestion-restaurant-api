const { ensureValidSecretKey, getSecretKey } = require('../config/secretKeyManager');
const secret_key = req.body
let lastUpdatedAt = null;
exports.renewSecretKey = async (req, res) => {
  try {
    await ensureValidSecretKey();
    getSecretKey()=secret_key
    lastUpdatedAt=Date.now()
    res.status(200).json({
      message: '✅ Clé secrète renouvelée avec succès',
      secretKey: getSecretKey(),
    });
  } catch (err) {
    res.status(500).json({
      message: '❌ Échec du renouvellement de la clé secrète',
      error: err.message,
    });
  }
};
