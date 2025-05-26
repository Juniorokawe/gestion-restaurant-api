// controllers/restaurantController.js
const RestaurantModel = require('../models/restaurantModel');

// GET /restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error("Erreur getAllRestaurants:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des restaurants' });
  }
};

// GET /restaurants/:id
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Erreur getRestaurantById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du restaurant' });
  }
};

// POST /restaurants
const createRestaurant = async (req, res) => {
  try {
    const { nom, adresse, phone, image, horaires } = req.body;

    const nouveauRestaurant = await RestaurantModel.create({ nom, adresse, phone, image, horaires });
    res.status(201).json({ message: 'Restaurant ajouté', restaurant: nouveauRestaurant });
  } catch (error) {
    
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création du restaurant' });
  };

// PUT /restaurants/:id
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, phone, image, horaires } = req.body;
     

    const affectedRows = await RestaurantModel.update(id, { nom, adresse, phone, image, horaires });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Restaurant non trouvé pour la mise à jour' });
    }
    res.json({ message: 'Restaurant mis à jour' });
  } catch (error) {
    console.error("Erreur updateRestaurant:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre restaurant.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du restaurant' });
  }
};

// DELETE /restaurants/:id
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await RestaurantModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Restaurant non trouvé pour la suppression' });
    }
    res.status(200).json({ message: 'Restaurant supprimé' });
  } catch (error) {
    console.error("Erreur deleteRestaurant:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer ce restaurant car il est référencé ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du restaurant' });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};