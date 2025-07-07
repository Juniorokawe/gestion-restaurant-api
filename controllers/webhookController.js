const Transaction = require('../models/Transaction');

exports.handleCallback = async (req, res) => {
  const { reference, transaction_id, status } = req.body;

  if (!reference || !transaction_id || !status) {
    return res.status(400).json({ success: false, message: 'Paramètres manquants dans le webhook' });
  }

  try {
    await Transaction.updateTransaction(reference, {
      transaction_id,
      status,
      updated_at: new Date()
    });

    console.log(`✅ Webhook reçu pour référence ${reference} - statut : ${status}`);
    res.status(200).json({ success: true, message: 'Webhook traité' });
  } catch (error) {
    console.error('❌ Erreur traitement webhook :', error.message);
    res.status(500).json({ success: false, message: 'Erreur traitement webhook' });
  }
};
