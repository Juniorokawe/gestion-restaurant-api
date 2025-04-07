// models/restaurantModel.js
const pool = require('../config/database');

// Trouver tous les restaurants
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Restaurant');
  return rows;
};

// Trouver un restaurant par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Restaurant WHERE id_restaurant = ?', [id]);
  return rows[0];
};

// Créer un nouveau restaurant
const create = async ({ nom, adresse, telephone, email, horaires }) => {
  const sql = 'INSERT INTO Restaurant (nom, adresse, telephone, email, horaires) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.query(sql, [nom, adresse, telephone, email, horaires]);
  return { id: result.insertId, nom, adresse, telephone, email, horaires };
};

// Mettre à jour un restaurant
const update = async (id, { nom, adresse, telephone, email, horaires }) => {
  const sql = 'UPDATE Restaurant SET nom = ?, adresse = ?, telephone = ?, email = ?, horaires = ? WHERE id_restaurant = ?';
  const [result] = await pool.query(sql, [nom, adresse, telephone, email, horaires, id]);
  return result.affectedRows;
};

// Supprimer un restaurant
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Restaurant WHERE id_restaurant = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};