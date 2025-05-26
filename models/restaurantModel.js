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
const create = async ({ nom, adresse, phone, image, horaires }) => {
  const sql = 'INSERT INTO Restaurant (nom, adresse, phone, image, horaires) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.query(sql, [nom, adresse, phone, image, horaires]);
  return { id: result.insertId, nom, adresse, phone, image, horaires };
};

// Mettre à jour un restaurant
const update = async (id, { nom, adresse, phone, image, horaires }) => {
  const sql = 'UPDATE Restaurant SET nom = ?, adresse = ?, phone = ?, image = ?, horaires = ? WHERE id_restaurant = ?';
  const [result] = await pool.query(sql, [nom, adresse, phone, image, horaires, id]);
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