// controllers/livraisonController.js
const LivraisonModel = require('../models/livraisonModel');

// GET /livraisons
const getAllLivraisons = async (req, res) => {
  try {
    const livraisons = await LivraisonModel.findAll();
    res.json(livraisons);
  } catch (error) {
    console.error("Erreur getAllLivraisons:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des livraisons' });
  }
};

// GET /livraisons/:id
const getLivraisonById = async (req, res) => {
  try {
    const { id } = req.params;
    const livraison = await LivraisonModel.findById(id);
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json(livraison);
  } catch (error) {
    console.error("Erreur getLivraisonById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la livraison' });
  }
};

// POST /livraisons
const createLivraison = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouvelleLivraison = await LivraisonModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Livraison créée', livraison: nouvelleLivraison });
  } catch (error) {
    console.error("Erreur createLivraison:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création de la livraison' });
  }
};

// PUT /livraisons/:id
const updateLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await LivraisonModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée pour la mise à jour' });
    }
    res.json({ message: 'Livraison mise à jour' });
  } catch (error) {
    console.error("Erreur updateLivraison:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par une autre livraison.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la livraison' });
  }
};

// DELETE /livraisons/:id
const deleteLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await LivraisonModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée pour la suppression' });
    }
    res.status(200).json({ message: 'Livraison supprimée' });
  } catch (error) {
    console.error("Erreur deleteLivraison:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer cette livraison car elle est référencée ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la livraison' });
  }
};

module.exports = {
  getAllLivraisons,
  getLivraisonById,
  createLivraison,
  updateLivraison,
  deleteLivraison
};