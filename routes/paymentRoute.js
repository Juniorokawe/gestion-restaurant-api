const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/rest-transaction', paymentController.initiatePayment);

module.exports = router;
