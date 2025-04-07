// routes/livreurRoutes.js
const express = require('express');
const router = express.Router();
const livreurController = require('../controllers/livreurController');

// Route pour récupérer tous les livreurs et en créer un nouveau
router.route('/')
  .get(livreurController.getAllLivreurs)
  .post(livreurController.createLivreur);

// Route pour gérer un livreur spécifique
router.route('/:id')
  .get(livreurController.getLivreurById)
  .put(livreurController.updateLivreur)
  .delete(livreurController.deleteLivreur);

module.exports = router;