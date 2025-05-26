const CommandeModel = require('../models/commandeModel');

// GET /commandes — toutes les commandes
const getAllCommandes = async (req, res) => {
  try {
    const commandes = await CommandeModel.findAll();
    res.status(200).json(commandes);
  } catch (error) {
    console.error("Erreur dans getAllCommandes:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes" });
  }
};

// GET /commandes/:id — une commande spécifique
const getCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await CommandeModel.findById(id);

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(commande);
  } catch (error) {
    console.error("Erreur dans getCommandeById:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération de la commande" });
  }
};

// POST /commandes — création d’une commande
const createCommande = async (req, res) => {
  try {
    const { statut, mode_de_paiement, id_utilisateur, id_plat } = req.body;

    if (!mode_de_paiement || !id_utilisateur || !id_plat) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const nouvelleCommande = await CommandeModel.create({
      statut: statut || 'en attente',
      mode_de_paiement,
      id_utilisateur,
      id_plat
    });

    res.status(201).json({ message: "Commande créée avec succès", commande: nouvelleCommande });
  } catch (error) {
    console.error("Erreur dans createCommande:", error);
    res.status(500).json({ message: "Erreur serveur lors de la création de la commande" });
  }
};

// PUT /commandes/:id — mise à jour d’une commande
const updateCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, mode_de_paiement } = req.body;

    const affectedRows = await CommandeModel.update(id, { statut, mode_de_paiement });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Commande non trouvée pour la mise à jour" });
    }

    res.status(200).json({ message: "Commande mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur dans updateCommande:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour de la commande" });
  }
};

// DELETE /commandes/:id — suppression d’une commande
const deleteCommande = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await CommandeModel.remove(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Commande non trouvée pour la suppression" });
    }

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur dans deleteCommande:", error);

    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        message: "Impossible de supprimer cette commande car elle est référencée ailleurs."
      });
    }

    res.status(500).json({ message: "Erreur serveur lors de la suppression de la commande" });
  }
};

module.exports = {
  getAllCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande
};
