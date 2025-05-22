const UtilisateurModel = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await UtilisateurModel.findAll();
    res.json(utilisateurs);
  } catch (error) {
    console.error("Erreur getAllUtilisateurs:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createUtilisateur = async (req, res) => {
  try {
    const { nom, prenom, telephone, email, password, role } = req.body;

    if (!email || !password || !role ) {
      return res.status(400).json({ message: 'les champs email, password et role doivent être remplis' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await UtilisateurModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Vérifier si le rôle est valide
    if (!['restaurant', 'client'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const nouvelUtilisateur = await UtilisateurModel.create({
      nom,
      prenom,
      telephone,
      email,
      password: hashedPassword,
      role,
      image
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      utilisateur: {
        ...nouvelUtilisateur,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Erreur createUtilisateur:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getUtilisateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await UtilisateurModel.findById(id);
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Ne pas renvoyer le mot de passe
    const { password, ...utilisateurSansPassword } = utilisateur;
    res.json(utilisateurSansPassword);
  } catch (error) {
    console.error("Erreur getUtilisateurById:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const loginUtilisateur = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const utilisateur = await UtilisateurModel.findByEmail(email);
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const validPassword = await bcrypt.compare(password, utilisateur.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { 
        userId: utilisateur.id_utilisateur, 
        role: utilisateur.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      utilisateur: {
        id: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (error) {
    console.error("Erreur loginUtilisateur:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, email, role } = req.body;
    
    // Vérifier si l'utilisateur existe
    const utilisateur = await UtilisateurModel.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le nouvel email n'est pas déjà utilisé
    if (email && email !== utilisateur.email) {
      const existingUser = await UtilisateurModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
    }

    // Mise à jour
    const resultat = await UtilisateurModel.update(id, {
      nom: nom || utilisateur.nom,
      prenom: prenom || utilisateur.prenom,
      telephone: telephone || utilisateur.telephone,
      email: email || utilisateur.email,
      role: role || utilisateur.role
    });

    if (!resultat) {
      return res.status(400).json({ message: 'Erreur lors de la mise à jour' });
    }

    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error("Erreur updateUtilisateur:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    
    const utilisateur = await UtilisateurModel.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const resultat = await UtilisateurModel.remove(id);
    if (!resultat) {
      return res.status(400).json({ message: 'Erreur lors de la suppression' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error("Erreur deleteUtilisateur:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  loginUtilisateur,
  updateUtilisateur,
  deleteUtilisateur
};