// models/categorieModel.js
const pool = require('../config/database');

// Trouver toutes les catégories
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Categorie');
  return rows;
};

// Trouver une catégorie par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Categorie WHERE id_categorie = ?', [id]);
  return rows[0];
};

// Créer une nouvelle catégorie
const create = async ({ categorie, image}) => {
  const [result] = await pool.query(
    'INSERT INTO Categorie (categorie, image) VALUES (?,?)',
    [categorie, image]
  );
  return {id: result.insertId, categorie, image};
};

// Mettre à jour une catégorie
const update = async (id, { categorie, image }) => {
  const [result] = await pool.query(
    'UPDATE Categorie SET categorie = ? image = ? WHERE id_categorie = ?',
    [categorie, id , image]
  );
  return result.affectedRows > 0;
};

// Supprimer une catégorie
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Categorie WHERE id_categorie = ?', [id]);
  return result.affectedRows > 0;
};



module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};