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
    try {
        const [result] = await pool.query(
            'INSERT INTO Utilisateurs (nom, prenom, telephone, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [nom, prenom, telephone, email, password, role]
        );

        console.log('Résultat création utilisateur:', result);

        if (!result.insertId) {
            throw new Error('Échec de la création de l\'utilisateur');
        }

        // Récupérer l'utilisateur créé
        const [rows] = await pool.query(
            'SELECT * FROM Utilisateurs WHERE id_utilisateur = ?',
            [result.insertId]
        );

        return rows[0];
    } catch (error) {
        console.error('Erreur dans create:', error);
        throw error;
    }
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
    try {
        console.log('Tentative de stockage OTP:', { userId, otp, expiryTime });
        
        const [result] = await pool.query(
            'UPDATE Utilisateurs SET otp = ?, otp_expiry = ?, is_verified = ? WHERE id_utilisateur = ?',
            [otp, expiryTime, false, userId]
        );
        
        if (result.affectedRows === 0) {
            throw new Error(`Aucun utilisateur trouvé avec l'ID: ${userId}`);
        }
        
        console.log('OTP stocké avec succès');
        return true;
    } catch (error) {
        console.error('Erreur dans storeOTP:', error);
        throw error;
    }
};

const verifyOTP = async (userId, otp) => {
    try {
        console.log('Vérification OTP:', { userId, otp });
        
        const [rows] = await pool.query(
            `SELECT * FROM Utilisateurs 
             WHERE id_utilisateur = ? 
             AND otp = ? 
             AND otp_expiry > NOW() 
             AND is_verified = false`,
            [userId, otp]
        );
        
        console.log('Résultat requête verifyOTP:', rows[0]);
        return rows[0];
    } catch (error) {
        console.error('Erreur dans verifyOTP:', error);
        throw error;
    }
};

const markAsVerified = async (userId) => {
  try {
    const [result] = await pool.query(
      'UPDATE Utilisateurs SET is_verified = true, otp = NULL, otp_expiry = NULL WHERE id_utilisateur = ?',
      [userId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erreur markAsVerified:', error);
    throw error;
  }
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