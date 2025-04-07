// models/administrateurModel.js
const pool = require('../config/database'); // Importe le pool de connexion

// Trouver tous les administrateurs
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Administrateur');
  return rows;
};

// Trouver un administrateur par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Administrateur WHERE id_administrateur = ?', [id]);
  return rows[0]; // Retourne le premier résultat ou undefined
};

// Créer un nouvel administrateur
const create = async ({ nom, prenom, email }) => {
  const sql = 'INSERT INTO Administrateur (nom, prenom, email) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nom, prenom, email]);
  return { id: result.insertId, nom, prenom, email }; // Retourne l'objet créé avec son ID
};

// Mettre à jour un administrateur
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Administrateur SET nom = ?, prenom = ?, email = ? WHERE id_administrateur = ?';
  const [result] = await pool.query(sql, [nom, prenom, email, id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées (devrait être 1 si trouvé)
};

// Supprimer un administrateur
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Administrateur WHERE id_administrateur = ?', [id]);
  return result.affectedRows; // Retourne le nombre de lignes affectées
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};