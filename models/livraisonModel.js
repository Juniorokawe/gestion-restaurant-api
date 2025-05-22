// models/livraisonModel.js
const pool = require('../config/database');

// Trouver toutes les livraisons
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Livraisons');
  return rows;
};

// Trouver une livraison par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Livraison WHERE id_livraison = ?', [id]);
  return rows[0];
};

// Créer une nouvelle livraison
const create = async ({ nom, id_commande, id_livreur, adresse_livraison, statut, date_livraison }) => {
  const sql = 'INSERT INTO Livraison (nom, id_commande, id_livreur, adresse_livraison, statut, date_livraison ) VALUES (?, ?, ?, ?, ?, ?)';
  const [result] = await pool.query(sql, [nom, id_commande, id_livreur, adresse_livraison, statut, date_livraison]);
  return { id: result.insertId, nom, prenom, email };
};

// Mettre à jour une livraison
const update = async (id, { nom, prenom, email }) => {
  const sql = 'UPDATE Livraison SET nom = ?, id_commande = ?, id_livreur = ? adresse_livraison = ? statut = ? date_livraison = ? WHERE id_livraison = ?';
  const [result] = await pool.query(sql, [nom, id_commande, id_livreur, adresse_livraison, statut, date_livraison , id]);
  return result.affectedRows;
};

// Supprimer une livraison
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Livraison WHERE id_livraison = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};