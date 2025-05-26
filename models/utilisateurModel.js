// models/utilisateurModel.js
const pool = require('../config/database');

// Trouver tous les utilisateurs
const findAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM Utilisateurs');
    return rows;
  } catch (error) {
    console.error("Erreur dans findAll:", error);
    throw error;
  }
};

// Trouver un utilisateur par son ID
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Utilisateurs WHERE id_utilisateur = ?', [id]);
  return rows[0]; // Retourne le premier résultat ou undefined
};

// Trouver un utilisateur par son email
const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Utilisateurs WHERE email = ?', [email]);
  return rows[0]; // Retourne le premier résultat ou undefined
};

// Créer un nouvel utilisateur
const create = async ({ nom, prenom, telephone, email, password, role }) => {
  const [result] = await pool.query(
    'INSERT INTO Utilisateurs (nom, prenom, telephone, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
    [nom, prenom, telephone, email, password, role]
  );
  return { id: result.insertId, nom, prenom, telephone, email, role }; // Retourne l'objet créé avec son ID
};

// Mettre à jour un utilisateur
const update = async (id, { nom, prenom, telephone, email, role }) => {
  const [result] = await pool.query(
    'UPDATE Utilisateurs SET nom = ?, prenom = ?, telephone = ?, email = ?, role = ? WHERE id_utilisateur = ?',
    [nom, prenom, telephone, email, role, id]
  );
  return result.affectedRows > 0; // Retourne true si une ligne a été modifiée
};

// Supprimer un utilisateur
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM Utilisateurs WHERE id_utilisateur = ?', [id]);
  return result.affectedRows > 0; // Retourne true si une ligne a été supprimée
};

const storeOTP = async (userId, otp, expiryTime) => {
    const [result] = await pool.query(
        'UPDATE Utilisateurs SET otp = ?, otp_expiry = ?, is_verified = false WHERE id_utilisateur = ?',
        [otp, expiryTime, userId]
    );
    return result.affectedRows > 0;
};

const verifyOTP = async (userId, otp) => {
    const [rows] = await pool.query(
        'SELECT * FROM Utilisateurs WHERE id_utilisateur = ? AND otp = ? AND otp_expiry > NOW() AND is_verified = false',
        [userId, otp]
    );
    return rows[0];
};

const markAsVerified = async (userId) => {
    const [result] = await pool.query(
        'UPDATE Utilisateurs SET is_verified = true, otp = NULL, otp_expiry = NULL WHERE id_utilisateur = ?',
        [userId]
    );
    return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
  storeOTP,
  verifyOTP,
  markAsVerified
};