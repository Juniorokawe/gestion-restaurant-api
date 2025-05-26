// models/livreurModel.js
const pool = require('../config/database');

const findAll = async () => {
  // Récupérer tous les livreurs
  const [rows] = await pool.query('SELECT * FROM Livreurs');
  return rows;
};

// Trouver un livreur par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Livreurs WHERE id_livreur = ?', [id]);
  return rows[0];
};

// Créer un nouveau livreur
const create = async ({ nom, prenom, statut, type_de_vehicule, phone }) => {
  const sql = 'INSERT INTO Livreurs (nom, prenom, statut, type_de_vehicule, phone) VALUES (?, ?, ?, ?, ?)';
  
  const [result] = await pool.query(sql, [nom, prenom, statut, type_de_vehicule, phone]);
  return { id: result.insertId, nom, prenom, statut, type_de_vehicule, phone };
};

// Mettre à jour un livreur
const update = async (id, { nom, prenom, statut, type_de_vehicule, phone }) => {
  const sql = 'UPDATE Livreurs SET nom = ?, prenom = ?, statut = ?, type_de_vehicule= ?, phone = ? WHERE id_livreur = ?';
  const [result] = await pool.query(sql, [nom, prenom, statut, type_de_vehicule, phone, id]);
  return result.affectedRows;
};

// Supprimer un livreur
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Livreurs WHERE id_livreur = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};