const express = require('express');
const router = express.Router();
const secretKeyController = require('../controllers/secretKeyController');

// Route GET ou POST pour renouveler manuellement
router.get('/renew-secret-key', secretKeyController.renewSecretKey);

module.exports = router;
