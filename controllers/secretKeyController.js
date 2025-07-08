const { ensureValidSecretKey, getSecretKey } = require('../config/secretKeyManager');

exports.renewSecretKey = async (req, res) => {
  try {
    await ensureValidSecretKey();
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
