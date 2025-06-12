// controllers/paymentController.js
const pvitService = require('../services/pvitService');

exports.receiveSecretKey = async (req, res) => {
  const { secret_key } = req.body;

  if (!secret_key) {
    return res.status(400).json({ error: "Le champ 'secret_key' est requis." });
  }

  try {
    await pvitService.saveSecretKey(secret_key);
    res.status(200).json({ message: "Clé secrète reçue et enregistrée avec succès." });
  } catch (err) {
    console.error("Erreur DB :", err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement." });
  }
};

// Exemple : Initier un paiement
exports.initiatePayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const result = await pvitService.initiatePayment(paymentData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur paiement :", err.response?.data || err.message);
    res.status(500).json({ error: "Échec de l'initiation du paiement." });
  }
};

// Exemple : Vérifier une transaction
exports.checkStatus = async (req, res) => {
  const { transactionId, accountOperationCode, transactionOperation } = req.query;
  try {
    const status = await pvitService.checkTransactionStatus({ transactionId, accountOperationCode, transactionOperation });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: "Échec de la vérification." });
  }
};

// Générer un lien de paiement
exports.generatePaymentLink = async (req, res) => {
  try {
    const linkData = req.body;
    const result = await pvitService.generatePaymentLink(linkData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur lien de paiement :", err.response?.data || err.message);
    res.status(500).json({ error: "Échec de la génération du lien." });
  }
};
