const express = require('express');
const router = express.Router();
const secretKeyController = require('../controllers/secretKeyController');

// Route GET ou POST pour renouveler manuellement
router.post('/renew-secret-key', secretKeyController.renewSecretKey);

module.exports = router;
