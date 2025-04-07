// models/categorieModel.js
const pool = require('../config/database'); // Importe le pool de connexion

// Trouver toutes les catégories
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Categorie');
  return rows;
};

// Trouver une catégorie par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Categorie WHERE id_categorie = ?', [id]);
  return rows[0]; // Retourne le premier résultat ou undefined
};

// Créer une nouvelle catégorie
const create = async ({ nom, prenom, email }) => {
  const sql = 'INSERT INTO Categorie (nom, prenom, email) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, email]);
  return { id: result.insertId, nom, prenom, email }; // Retourne l'objet créé avec son ID
};

// Mettre à jour une catégorie
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Categorie SET nom = ?, prenom = ?, email = ? WHERE id_categorie = ?';
  const [result] = await pool.query(sql, [nom, prenom, email, id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées
};

// Supprimer une catégorie
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Categorie WHERE id_categorie = ?', [id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};