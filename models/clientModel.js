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
const create = async ({ nom, prenom, phone, email, password }) => {
  const sql = 'INSERT INTO Client (nom, prenom, phone, email, password) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, phone, email, password, image]);
  return { id: result.insertId, nom, prenom, phone, email, password, image}}; // Retourne l'objet créé avec son ID


// Mettre à jour un client
const update = async (id, { nom, prenom, phone, email, password }) => {
  const sql = 'UPDATE Client SET nom = ?, prenom = ?, phone = ?, email = ?, password = ? WHERE id_client = ?';
  const [result] = await pool.query(sql, [nom, prenom, phone, email, password, id]);
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