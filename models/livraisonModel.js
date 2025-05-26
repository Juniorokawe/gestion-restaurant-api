const pool = require('../config/database');

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM Livraisons');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Livraisons WHERE id_livraison = ?', [id]);
  return rows[0];
};

const create = async ({ id_commande, id_livreur, adresse_livraison, statut, date_livraison }) => {
  const sql = `
    INSERT INTO Livraisons 
    (id_commande, id_livreur, adresse_livraison, statut, date_livraison)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [id_commande, id_livreur, adresse_livraison, statut, date_livraison]);
  return { id: result.insertId, id_commande, id_livreur, adresse_livraison, statut, date_livraison };
};

const update = async (id, { id_commande, id_livreur, adresse_livraison, statut, date_livraison }) => {
  const sql = `
    UPDATE Livraisons 
    SET id_commande = ?, id_livreur = ?, adresse_livraison = ?, statut = ?, date_livraison = ?
    WHERE id_livraison = ?
  `;
  const [result] = await pool.query(sql, [id_commande, id_livreur, adresse_livraison, statut, date_livraison, id]);
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Livraisons WHERE id_livraison = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
