// routes/administrateurRoutes.js
const express = require('express');
const router = express.Router();
const administrateurController = require('../controllers/administrateurController');

// Route pour récupérer tous les administrateurs et en créer un nouveau
router.route('/')
  .get(administrateurController.getAllAdministrateurs)
  .post(administrateurController.createAdministrateur);

// Route pour récupérer, mettre à jour ou supprimer un administrateur spécifique
router.route('/:id')
  .get(administrateurController.getAdministrateurById)
  .put(administrateurController.updateAdministrateur)
  .delete(administrateurController.deleteAdministrateur);

module.exports = router;