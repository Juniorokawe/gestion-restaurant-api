// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Callback réception de la clé
router.post('/secret-callback', paymentController.receiveSecretKey);

// Générer un lien de paiement
router.post('/generate-link', paymentController.generatePaymentLink);

// Initier un paiement
router.post('/initiate', paymentController.initiatePayment);

// Vérifier le statut d'une transaction
router.get('/check-status', paymentController.checkStatus);

module.exports = router;
