// controllers/categorieController.js
const CategorieModel = require('../models/categorieModel');

// GET /categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategorieModel.findAll();
    res.send(resultat);
  } catch (error) {
    console.error("Erreur getAllCategories:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des catégories' });
  }
};

// GET /categories/:id
const getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await CategorieModel.findById(id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (error) {
    console.error("Erreur getCategorieById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la catégorie' });
  }
};

// POST /categories
const createCategorie = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis.' });
    }

    const nouvelleCategorie = await CategorieModel.create({ nom, prenom, email });
    res.status(201).json({ message: 'Catégorie ajoutée', categorie: nouvelleCategorie });
  } catch (error) {
    console.error("Erreur createCategorie:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création de la catégorie' });
  }
};

// PUT /categories/:id
const updateCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;
     if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Les champs nom, prenom et email sont requis pour la mise à jour.' });
    }

    const affectedRows = await CategorieModel.update(id, { nom, prenom, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Catégorie non trouvée pour la mise à jour' });
    }
    res.json({ message: 'Catégorie mise à jour' });
  } catch (error) {
    console.error("Erreur updateCategorie:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par une autre catégorie.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la catégorie' });
  }
};

// DELETE /categories/:id
const deleteCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await CategorieModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Catégorie non trouvée pour la suppression' });
    }
    res.status(200).json({ message: 'Catégorie supprimée' });
  } catch (error) {
    console.error("Erreur deleteCategorie:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer cette catégorie car elle est référencée ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la catégorie' });
  }
};

module.exports = {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie
};