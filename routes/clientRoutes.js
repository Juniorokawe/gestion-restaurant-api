// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route pour récupérer tous les clients et en créer un nouveau
router.route('/')
  .get(clientController.getAllClients)
  .post(clientController.createClient);

// Route pour récupérer, mettre à jour ou supprimer un client spécifique
router.route('/:id')
  .get(clientController.getClientById)
  .put(clientController.updateClient)
  .delete(clientController.deleteClient);

module.exports = router;