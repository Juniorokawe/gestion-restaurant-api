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
const create = async ({ nom, description, prix, id_restaurant, image }) => {
  const [result] = await pool.query(
    'INSERT INTO Plat (nom, description, prix, id_restaurant, image) VALUES (?, ?, ?, ?, ?)',
    [nom, description, prix, id_restaurant, image]
  );
  return { id: result.insertId, nom, description, prix, id_restaurant, image };
};

// Mettre à jour un plat
const update = async (id, { nom, description, prix, id_restaurant, image }) => {
  const [result] = await pool.query(
    'UPDATE Plat SET nom = ?, description = ?, prix = ?, id_restaurant = ?,  image = ? WHERE id_plat = ?',
    [nom, description, prix, id_restaurant, image, id]
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