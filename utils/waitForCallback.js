exports.waitForTransactionCallback = async (reference) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transaction_id: `TRX_${reference}`,
        status: "SUCCESS",
        received_at: new Date()
      });
    }, 2000); // simule un délai de 2 secondes
  });
};
