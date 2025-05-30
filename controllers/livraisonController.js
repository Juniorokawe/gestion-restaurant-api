const LivraisonModel = require('../models/livraisonModel');

// GET /livraisons
const getAllLivraisons = async (req, res) => {
  try {
    const livraisons = await LivraisonModel.findAll();
    res.status(200).json(livraisons);
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
    res.status(200).json(livraison);
  } catch (error) {
    console.error("Erreur getLivraisonById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la livraison' });
  }
};

// POST /livraisons
const createLivraison = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);
    const { id_commande, id_livreur, adresse_livraison, statut, date_livraison } = req.body;

    // Vérification des champs requis
    if (!id_commande || !id_livreur || !adresse_livraison || !statut || !date_livraison) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const nouvelleLivraison = await LivraisonModel.create({
      id_commande,
      id_livreur,
      adresse_livraison,
      statut,
      date_livraison
    });

    res.status(201).json({ message: 'Livraison créée', livraison: nouvelleLivraison });
  } catch (error) {
    console.error("Erreur createLivraison:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la livraison' });
  }
};

// PUT /livraisons/:id
const updateLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_commande, id_livreur, adresse_livraison, statut, date_livraison } = req.body;

    // Vérification des champs requis
    if (!id_commande || !id_livreur || !adresse_livraison || !statut || !date_livraison) {
      return res.status(400).json({ message: 'Tous les champs sont requis pour la mise à jour.' });
    }

    const affectedRows = await LivraisonModel.update(id, {
      id_commande,
      id_livreur,
      adresse_livraison,
      statut,
      date_livraison
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée pour la mise à jour' });
    }

    res.status(200).json({ message: 'Livraison mise à jour' });
  } catch (error) {
    console.error("Erreur updateLivraison:", error);
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
