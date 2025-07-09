const { ensureValidSecretKey } = require('../config/secretKeyManager');
let lastUpdatedAt = null;
exports.renewSecretKey = async (req, res) => {
  try {
    await ensureValidSecretKey();
    const {secret_key} = req.body
    secretKey=secret_key
    lastUpdatedAt=Date.now()
    res.status(200).json({
      message: '✅ Clé secrète renouvelée avec succès'
      
    });
  } catch (err) {
    res.status(500).json({
      message: '❌ Échec du renouvellement de la clé secrète',
      error: err.message,
    });
  }
};
