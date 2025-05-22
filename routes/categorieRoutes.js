// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// Route pour récupérer toutes les catégories et en créer une nouvelle
router.route('/')
  .get(categorieController.getAllCategories)
  .post(categorieController.createCategorie);

// Route pour gérer une catégorie spécifique
router.route('/:id')
  .get(categorieController.getCategorieById)
  .put(categorieController.updateCategorie)
  .delete(categorieController.deleteCategorie);

module.exports = router;