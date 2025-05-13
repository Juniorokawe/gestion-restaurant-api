// models/commandeModel.js
const pool = require('../config/database');

// Trouver toutes les commandes
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Commandes');
  return rows;
};

// Trouver une commande par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Commande WHERE id_commande = ?', [id]);
  return rows[0];
};

// Créer une nouvelle commande
const create = async ({ nom, prenom, email }) => {
  const sql = 'INSERT INTO Commande (nom, prenom, email) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, email]);
  return { id: result.insertId, nom, prenom, email };
};

// Mettre à jour une commande
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Commande SET nom = ?, prenom = ?, email = ? WHERE id_commande = ?';
  const [result] = await pool.query(sql, [nom, prenom, email, id]);
  return result.affectedRows;
};

// Supprimer une commande
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Commande WHERE id_commande = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};