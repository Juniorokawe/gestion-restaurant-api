// routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Route pour récupérer toutes les commandes et en créer une nouvelle
router.route('/')
  .get(commandeController.getAllCommandes)
  .post(commandeController.createCommande);

// Route pour récupérer, mettre à jour ou supprimer une commande spécifique
router.route('/:id')
  .get(commandeController.getCommandeById)
  .put(commandeController.updateCommande)
  .delete(commandeController.deleteCommande);

module.exports = router;