// models/clientModel.js
const pool = require('../config/database'); // Importe le pool de connexion

// Trouver tous les clients
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Client');
  return rows;
};

// Trouver un client par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Client WHERE id_client = ?', [id]);
  return rows[0]; // Retourne le premier résultat ou undefined
};

// Créer un nouveau client
const create = async ({ nom, prenom, email }) => {
  const sql = 'INSERT INTO Client (nom, prenom, email) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, email]);
  return { id: result.insertId, nom, prenom, email }; // Retourne l'objet créé avec son ID
};

// Mettre à jour un client
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Client SET nom = ?, prenom = ?, email = ? WHERE id_client = ?';
  const [result] = await pool.query(sql, [nom, prenom, email, id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées
};

// Supprimer un client
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Client WHERE id_client = ?', [id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};