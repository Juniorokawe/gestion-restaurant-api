const Transaction = require('../models/Transaction');

const VALID_STATUSES = ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'TIMEOUT'];

exports.handleCallback = async (req, res) => {
  const { reference, transaction_id, status, error_message } = req.body;

  if (!reference || !transaction_id || !status) {
    console.error(`[WEBHOOK] Paramètres manquants:`, req.body);
    return res.status(400).json({ success: false, message: 'Paramètres manquants dans le webhook' });
  }

  if (!VALID_STATUSES.includes(status)) {
    console.warn(`[WEBHOOK] Statut inattendu: ${status} pour ref ${reference}`);
  }

  try {
    await Transaction.updateTransaction(reference, {
      transaction_id,
      status,
      error_message: error_message || null,
      updated_at: new Date()
    });

    console.log(`✅ Webhook reçu pour référence ${reference} - statut : ${status}`);
    res.status(200).json({ success: true, message: 'Webhook traité' });
  } catch (error) {
    console.error('❌ Erreur traitement webhook :', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Erreur traitement webhook', error: error.message });
  }
};
