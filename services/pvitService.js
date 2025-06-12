// services/pvitService.js
const axios = require('axios');
const db = require('../config/database');

// CONFIGURATION
const BASE_URL = 'https://api.mypvit.pro';
const CODE_URL = 'D2BWX'; // Remplace par ton vrai code
let X_SECRET = null; // sera récupéré dynamiquement depuis la BDD

// Récupérer la dernière clé secrète en BDD
const loadSecretKey = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT token FROM pvit_tokens ORDER BY id DESC LIMIT 1', (err, result) => {
      if (err) return reject(err);
      X_SECRET = result[0]?.token;
      resolve(X_SECRET);
    });
  });
};

// Initier un paiement
const initiatePayment = async (data) => {
  if (!X_SECRET) await loadSecretKey();

  const response = await axios.post(`${BASE_URL}/${CODE_URL}/rest`, data, {
    headers: {
      'X-Secret': X_SECRET,
      'Content-Type': 'application/json',
      'X-Callback-MediaType': 'application/json'
    }
  });

  return response.data;
};

// Renouveler la clé secrète
const renewSecretKey = async ({ operationAccountCode, receptionUrlCode, password }) => {
  const response = await axios.post(`${BASE_URL}/${CODE_URL}/renew-secret`, null, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: { operationAccountCode, receptionUrlCode, password }
  });

  return response.data;
};

// Sauvegarder une nouvelle clé secrète
const saveSecretKey = async (secretKey) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO pvit_tokens (token) VALUES (?)', [secretKey], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Vérifier le statut d'une transaction
const checkTransactionStatus = async ({ transactionId, accountOperationCode, transactionOperation }) => {
  if (!X_SECRET) await loadSecretKey();

  const url = `${BASE_URL}/${CODE_URL}/status`;
  const response = await axios.get(url, {
    params: { transactionId, accountOperationCode, transactionOperation },
    headers: { 'X-Secret': X_SECRET }
  });

  return response.data;
};

module.exports = {
  initiatePayment,
  renewSecretKey,
  saveSecretKey,
  checkTransactionStatus,
  loadSecretKey
};

// Générer un lien de paiement (Transaction Link API)
const generatePaymentLink = async ({
  agent,
  amount,
  product,
  reference,
  service,
  callback_url_code,
  customer_account_number,
  merchant_operation_account_code,
  transaction_type,
  owner_charge,
  operator_owner_charge,
  free_info,
  failed_redirection_url_code,
  success_redirection_url_code
}) => {
  if (!X_SECRET) await loadSecretKey();

  const response = await axios.post(`${BASE_URL}/${CODE_URL}/RESTLINK`, {
    agent,
    amount,
    product,
    reference,
    service,
    callback_url_code,
    customer_account_number,
    merchant_operation_account_code,
    transaction_type,
    owner_charge,
    operator_owner_charge,
    free_info,
    failed_redirection_url_code,
    success_redirection_url_code
  }, {
    headers: {
      'X-Secret': X_SECRET,
      'Content-Type': 'application/json',
      'X-Callback-MediaType': 'application/json'
    }
  });

  return response.data;
};

module.exports = {
  initiatePayment,
  renewSecretKey,
  saveSecretKey,
  checkTransactionStatus,
  loadSecretKey,
  generatePaymentLink // 👈 ajouter ici à l'export
};
