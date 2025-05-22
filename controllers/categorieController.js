// controllers/categorieController.js

const CategorieModel = require('../models/categorieModel');

// GET /categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategorieModel.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Erreur getAllCategories:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des categories' });
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
    const { categorie} = req.body;
    const { image } = req.body; // Assurez-vous que l'image est envoyée dans le corps de la requête
    if (!categorie) {
      return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
    }

    const nouvelleCategorie = await CategorieModel.create({ categorie, image });
    res.status(201).json({ 
      message: 'Catégorie créée avec succès',
      categorie: nouvelleCategorie 
    });
  } catch (error) {
    console.error("Erreur createCategorie:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la catégorie' });
  }
};

// PUT /categories/:id
const updateCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { categorie, image } = req.body;
    
    if (!categorie) {
      return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
    }

    const categorieMiseAJour = await CategorieModel.update(id, { categorie, image });
    if (!categorieMiseAJour) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.json({ message: 'Catégorie mise à jour avec succès' });
  } catch (error) {
    console.error("Erreur updateCategorie:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la catégorie' });
  }
};

// DELETE /categories/:id
const deleteCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const resultat = await CategorieModel.remove(id);
    
    if (!resultat) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error("Erreur deleteCategorie:", error);
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