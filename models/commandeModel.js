// models/commandeModel.js
const pool = require('../config/database');

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Commandes');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Commandes WHERE id_commande = ?', [id]);
  return rows[0];
};

const create = async ({ id_utilisateur, id_plat, statut, mode_de_paiement }) => {
  const [rows] = await pool.query(
    'INSERT INTO Commandes (id_utilisateur, id_plat, statut, mode_de_paiement) VALUES (?, ?, ?, ?)',
    [id_utilisateur, id_plat, statut, mode_de_paiement]
  );
  return rows;
};

const update = async (id, { statut, mode_de_paiement, date_commande }) => {
  const [result] = await pool.query(
    'UPDATE Commandes SET statut = ?, mode_de_paiement = ?, date_commande = ? WHERE id_commande = ?',
    [statut, mode_de_paiement, date_commande, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Commandes WHERE id_commande = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};