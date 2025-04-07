// routes/livraisonRoutes.js
const express = require('express');
const router = express.Router();
const livraisonController = require('../controllers/livraisonController');

// Route pour récupérer toutes les livraisons et en créer une nouvelle
router.route('/')
  .get(livraisonController.getAllLivraisons)
  .post(livraisonController.createLivraison);

// Route pour gérer une livraison spécifique
router.route('/:id')
  .get(livraisonController.getLivraisonById)
  .put(livraisonController.updateLivraison)
  .delete(livraisonController.deleteLivraison);

module.exports = router;