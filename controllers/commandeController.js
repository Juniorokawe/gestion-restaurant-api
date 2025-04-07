// controllers/commandeController.js
const CommandeModel = require('../models/commandeModel');

// GET /commandes
const getAllCommandes = async (req, res) => {
  try {
    const commandes = await CommandeModel.findAll();
    res.json(commandes);
  } catch (error) {
    console.error("Erreur getAllCommandes:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commandes' });
  }
};

// GET /commandes/:id
const getCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await CommandeModel.findById(id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (error) {
    console.error("Erreur getCommandeById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la commande' });
  }
};

// POST /commandes
const createCommande = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouvelleCommande = await CommandeModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Commande créée', commande: nouvelleCommande });
  } catch (error) {
    console.error("Erreur createCommande:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création de la commande' });
  }
};

// PUT /commandes/:id
const updateCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await CommandeModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Commande non trouvée pour la mise à jour' });
    }
    res.json({ message: 'Commande mise à jour' });
  } catch (error) {
    console.error("Erreur updateCommande:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par une autre commande.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la commande' });
  }
};

// DELETE /commandes/:id
const deleteCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await CommandeModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Commande non trouvée pour la suppression' });
    }
    res.status(200).json({ message: 'Commande supprimée' });
  } catch (error) {
    console.error("Erreur deleteCommande:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer cette commande car elle est référencée ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la commande' });
  }
};

module.exports = {
  getAllCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande
};