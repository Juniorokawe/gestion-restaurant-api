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
const create = async ({ nom, description, prix, id_restaurant }) => {
  const [result] = await pool.query(
    'INSERT INTO Plat (nom, description, prix, id_restaurant) VALUES (?, ?, ?, ?)',
    [nom, description, prix, id_restaurant]
  );
  return { id: result.insertId, nom, description, prix, id_restaurant };
};

// Mettre à jour un plat
const update = async (id, { nom, description, prix, id_restaurant }) => {
  const [result] = await pool.query(
    'UPDATE Plat SET nom = ?, description = ?, prix = ?, id_restaurant = ? WHERE id_plat = ?',
    [nom, description, prix, id_restaurant, id]
  );
  return result.affectedRows > 0;
};

// Supprimer un plat
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Plat WHERE id_plat = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};