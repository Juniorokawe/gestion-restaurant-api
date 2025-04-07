// models/platModel.js
const pool = require('../config/database');

// Trouver tous les plats
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Plat');
  return rows;
};

// Trouver un plat par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Plat WHERE id_plat = ?', [id]);
  return rows[0];
};

// Créer un nouveau plat
const create = async ({ nom, description, prix }) => {
  const sql = 'INSERT INTO Plat (nom, description, prix) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, description, prix]);
  return { id: result.insertId, nom, description, prix };
};

// Mettre à jour un plat
const update = async (id, { nom, description, prix }) => {
  const sql = 'UPDATE Plat SET nom = ?, description = ?, prix = ? WHERE id_plat = ?';
  const [result] = await pool.query(sql, [nom, description, prix, id]);
  return result.affectedRows;
};

// Supprimer un plat
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Plat WHERE id_plat = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};