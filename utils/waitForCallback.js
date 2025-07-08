exports.waitForTransactionCallback = async (reference) => {
  // En production, on ne simule plus l'attente :
  // La transaction sera mise à jour par le webhook PVIT.
  // Cette fonction peut être utilisée pour vérifier le statut en base si besoin.
  const Transaction = require('../models/Transaction');
  let attempts = 0;
  const maxAttempts = 20; // ~1 min
  const delay = 3000; // 3 secondes

  return new Promise(async (resolve, reject) => {
    while (attempts < maxAttempts) {
      const trx = await Transaction.findByReference(reference);
      if (trx && trx.status && trx.status !== 'PENDING') {
        return resolve(trx);
      }
      await new Promise(r => setTimeout(r, delay));
      attempts++;
    }
    reject(new Error('Timeout: statut de transaction non mis à jour par le webhook.'));
  });
};
