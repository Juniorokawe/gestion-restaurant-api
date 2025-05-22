// controllers/platController.js
const PlatModel = require('../models/platModel');

// GET /plats
const getAllPlats = async (req, res) => {
  try {
    const plats = await PlatModel.findAll();
    res.json(plats);
  } catch (error) {
    console.error("Erreur getAllPlats:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des plats' });
  }
};

// GET /plats/:id
const getPlatById = async (req, res) => {
  try {
    const { id } = req.params;
    const plat = await PlatModel.findById(id);
    if (!plat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json(plat);
  } catch (error) {
    console.error("Erreur getPlatById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du plat' });
  }
};

// POST /plats
const createPlat = async (req, res) => {
  try {
    const { nom, description, prix, id_restaurant, image } = req.body;

    const nouveauPlat = await PlatModel.create({ 
      nom, 
      description, 
      prix, 
      id_restaurant,
      image
    });
    
    res.status(201).json({
      message: 'Plat créé avec succès',
      plat: nouveauPlat
    });
  } catch (error) {
    console.error('Erreur création plat:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT /plats/:id
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, id_restaurant, image } = req.body;

    const platMisAJour = await PlatModel.update(id, { 
      nom, 
      description, 
      prix, 
      id_restaurant,
      image 
    });
    
    if (!platMisAJour) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    res.json({ message: 'Plat mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur mise à jour plat:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// DELETE /plats/:id
const deletePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const resultat = await PlatModel.remove(id);
    
    if (!resultat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression plat:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllPlats,
  getPlatById,
  createPlat,
  updatePlat,
  deletePlat
};