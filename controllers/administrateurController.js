// controllers/administrateurController.js
const AdministrateurModel = require('../models/administrateurModel');

// GET /administrateurs
const getAllAdministrateurs = async (req, res) => {
  try {
    const administrateurs = await AdministrateurModel.findAll();
    res.json(administrateurs);
  } catch (error) {
    console.error("Erreur getAllAdministrateurs:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des administrateurs' });
  }
};

// GET /administrateurs/:id
const getAdministrateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const administrateur = await AdministrateurModel.findById(id);
    if (!administrateur) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }
    res.json(administrateur);
  } catch (error) {
    console.error("Erreur getAdministrateurById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'administrateur' });
  }
};

// POST /administrateurs
const createAdministrateur = async (req, res) => {
  try {
    // Ajout potentiel de validation ici (ex: vérifier que nom, prenom, email existent)
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouvelAdministrateur = await AdministrateurModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Administrateur ajouté', administrateur: nouvelAdministrateur });
  } catch (error) {
    console.error("Erreur createAdministrateur:", error);
    // Gérer les erreurs spécifiques de la BDD si nécessaire (ex: email dupliqué)
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'administrateur' });
  }
};

// PUT /administrateurs/:id
const updateAdministrateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await AdministrateurModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Administrateur non trouvé pour la mise à jour' });
    }
    res.json({ message: 'Administrateur mis à jour' });
  } catch (error) {
    console.error("Erreur updateAdministrateur:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre administrateur.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'administrateur' });
  }
};

// DELETE /administrateurs/:id
const deleteAdministrateur = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await AdministrateurModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Administrateur non trouvé pour la suppression' });
    }
    // Réponse 204 (No Content) est aussi une bonne pratique pour DELETE réussi
    res.status(200).json({ message: 'Administrateur supprimé' });
    // Alternative: res.status(204).send();
  } catch (error) {
    console.error("Erreur deleteAdministrateur:", error);
     // Gérer les erreurs de clé étrangère si la suppression échoue à cause de dépendances
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer cet administrateur car il est référencé ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'administrateur' });
  }
};


module.exports = {
  getAllAdministrateurs,
  getAdministrateurById,
  createAdministrateur,
  updateAdministrateur,
  deleteAdministrateur
};