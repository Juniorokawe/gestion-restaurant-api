const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/pvit-callback', webhookController.handleCallback);

module.exports = router;
