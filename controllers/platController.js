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
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouveauPlat = await PlatModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Plat ajouté', plat: nouveauPlat });
  } catch (error) {
    console.error("Erreur createPlat:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création du plat' });
  }
};

// PUT /plats/:id
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await PlatModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Plat non trouvé pour la mise à jour' });
    }
    res.json({ message: 'Plat mis à jour' });
  } catch (error) {
    console.error("Erreur updatePlat:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre plat.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du plat' });
  }
};

// DELETE /plats/:id
const deletePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await PlatModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Plat non trouvé pour la suppression' });
    }
    res.status(200).json({ message: 'Plat supprimé' });
  } catch (error) {
    console.error("Erreur deletePlat:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer ce plat car il est référencé ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du plat' });
  }
};

module.exports = {
  getAllPlats,
  getPlatById,
  createPlat,
  updatePlat,
  deletePlat
};