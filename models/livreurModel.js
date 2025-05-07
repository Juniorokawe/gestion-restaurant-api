// models/livreurModel.js
const pool = require('../config/database');

const findAll = async () => {
  // Changez 'Livreur' en 'Livreurs' pour correspondre au nom de la table
  const [rows] = await pool.query('SELECT * FROM Livreurs');
  return rows;
};

// Trouver un livreur par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Livreur WHERE id_livreur = ?', [id]);
  return rows[0];
};

// Créer un nouveau livreur
const create = async ({ nom, prenom, email }) => {
  const sql = 'INSERT INTO Livreur (nom, prenom, email) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, email]);
  return { id: result.insertId, nom, prenom, email };
};

// Mettre à jour un livreur
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Livreur SET nom = ?, prenom = ?, email = ? WHERE id_livreur = ?';
  const [result] = await pool.query(sql, [nom, prenom, email, id]);
  return result.affectedRows;
};

// Supprimer un livreur
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Livreur WHERE id_livreur = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};