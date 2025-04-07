// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Route pour récupérer tous les restaurants et en créer un nouveau
router.route('/')
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);

// Route pour gérer un restaurant spécifique
router.route('/:id')
  .get(restaurantController.getRestaurantById)
  .put(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

module.exports = router;