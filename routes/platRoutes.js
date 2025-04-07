// routes/platRoutes.js
const express = require('express');
const router = express.Router();
const platController = require('../controllers/platController');

// Route pour récupérer tous les plats et en créer un nouveau
router.route('/')
  .get(platController.getAllPlats)
  .post(platController.createPlat);

// Route pour gérer un plat spécifique
router.route('/:id')
  .get(platController.getPlatById)
  .put(platController.updatePlat)
  .delete(platController.deletePlat);

module.exports = router;