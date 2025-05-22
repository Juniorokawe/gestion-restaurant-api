// models/commandeModel.js
const pool = require('../config/database');

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Commande');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Commande WHERE id_commande = ?', [id]);
  return rows[0];
};

const create = async ({ statut, mode_de_paiement, date }) => {
  const [result] = await pool.query(
    'INSERT INTO Commande (statut, mode_de_paiement, date) VALUES (?, ?, ?)',
    [statut, mode_de_paiement, date]
  );
  return { id: result.insertId, statut, mode_de_paiement, date };
};

const update = async (id, { statut, mode_de_paiement, date }) => {
  const [result] = await pool.query(
    'UPDATE Commande SET statut = ?, mode_de_paiement = ?, date = ? WHERE id_commande = ?',
    [statut, mode_de_paiement, date, id]
  );
  return result.affectedRows;
};

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