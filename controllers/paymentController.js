const axios = require('axios');
const Transaction = require('../models/Transaction');
const generateReference = require('../utils/referenceGenerator');
const { ensureValidSecretKey } = require('../config/secretKeyManager');
const { waitForTransactionCallback} = require('../utils/waitForCallback');

exports.initiatePayment = async (req, res) => {
  let reference;
  await ensureValidSecretKey();
    let secret = secretKey;
    console.log('SecretKey utilisée pour la transaction :', secret);
  try {
    const {
      amount,
      product,
      customer_account_number,
      free_info,
      owner_charge = "MERCHANT",
      owner_charge_operator = "MERCHANT"
    } = req.body;
    if (!amount || !customer_account_number) {
      return res.status(400).json({
        success: false,
        message: 'amount et customer_account_number requis.'
      });
    }
    reference = generateReference();
    const pvitTransactionData = {
      agent: process.env.PVIT_AGENT || "AGENT-1",
      amount,
      product: product || "DEFAULT_PRODUCT",
      reference,
      service: "RESTFUL",
      callback_url_code: process.env.CODEURLCALLBACK,
      customer_account_number,
      merchant_operation_account_code: process.env.PVIT_ACCOUNT_ID,
      transaction_type: "PAYMENT",
      owner_charge,
      owner_charge_operator,
      free_info: (free_info || "Transaction Initiale").substring(0, 15)
    };
    await Transaction.create({
      transaction_id: `INIT_${reference}`,
      reference,
      amount,
      status: 'PENDING',
      customer_account_number,
      charge_owner: owner_charge,
      free_info,
      transaction_operation: 'PAYMENT',
      created_at: new Date(),
      updated_at: new Date()
    });
    let response;
    try {
      response = await axios.post(
        `${process.env.PVIT_BASE_URL}/FDY25APFTXSVPZV1/rest`,
        pvitTransactionData,
        {
          headers: {
            'X-Secret': secret,
            'X-Callback-MediaType': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
    } catch (err) {
      await Transaction.updateTransaction(reference, {
        status: 'FAILED',
        error_message: err.message,
        updated_at: new Date()
      });
      console.error(`[PVIT] Erreur communication:`, err.message, err.response?.data);
      return res.status(502).json({
        success: false,
        message: 'Erreur de communication avec le service de paiement',
        error: err.message,
        reference
      });
    }
    if (response.data.transaction_id && response.data.transaction_id !== `INIT_${reference}`) {
      await Transaction.updateTransaction(reference, {
        transaction_id: response.data.transaction_id
      });
    }
    // Réponse immédiate, le statut sera mis à jour par le webhook
   const transaction_result= await waitForTransactionCallback(reference);
    res.status(200).json({
      success: true,
      message: 'Transaction initiée, en attente de confirmation.',
      data: {
        ...transaction_result,
        initial_pvit_response: response.data,
        reference
      }
    });
  } catch (error) {
    await Transaction.updateTransaction(reference, {
      status: 'FAILED',
      error_message: error.message,
      updated_at: new Date()
    });
    console.error(`[API] Erreur paiement:`, error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur de paiement',
      error: error.message,
      reference
    });
  }
};

