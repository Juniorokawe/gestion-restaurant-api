// controllers/livreurController.js
const LivreurModel = require('../models/livreurModel');

// GET /livreurs
const getAllLivreurs = async (req, res) => {
  try {
    const livreurs = await LivreurModel.findAll();
    res.json(livreurs);
  } catch (error) {
    console.error("Erreur getAllLivreurs:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des livreurs' });
  }
};

// GET /livreurs/:id
const getLivreurById = async (req, res) => {
  try {
    const { id } = req.params;
    const livreur = await LivreurModel.findById(id);
    if (!livreur) {
      return res.status(404).json({ message: 'Livreur non trouvé' });
    }
    res.json(livreur);
  } catch (error) {
    console.error("Erreur getLivreurById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du livreur' });
  }
};

// POST /livreurs
const createLivreur = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouveauLivreur = await LivreurModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Livreur ajouté', livreur: nouveauLivreur });
  } catch (error) {
    console.error("Erreur createLivreur:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création du livreur' });
  }
};

// PUT /livreurs/:id
const updateLivreur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await LivreurModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Livreur non trouvé pour la mise à jour' });
    }
    res.json({ message: 'Livreur mis à jour' });
  } catch (error) {
    console.error("Erreur updateLivreur:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre livreur.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du livreur' });
  }
};

// DELETE /livreurs/:id
const deleteLivreur = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await LivreurModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Livreur non trouvé pour la suppression' });
    }
    res.status(200).json({ message: 'Livreur supprimé' });
  } catch (error) {
    console.error("Erreur deleteLivreur:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer ce livreur car il est référencé ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du livreur' });
  }
};

module.exports = {
  getAllLivreurs,
  getLivreurById,
  createLivreur,
  updateLivreur,
  deleteLivreur
};