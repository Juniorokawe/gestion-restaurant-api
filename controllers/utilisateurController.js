const transporter = require('../config/mailer');
const UtilisateurModel = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Fonction pour générer un code OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

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
      role
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

const register = async (req, res) => {
    try {
        const { nom, email, password, role } = req.body;

        // Validation
        if (!nom || !email || !password || !role) {
            return res.status(400).json({ 
                message: 'Les champs nom, email, password et rôle sont obligatoires' 
            });
        }

        // Vérification email unique
        const existingUser = await UtilisateurModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Validation du rôle
        if (!['restaurant', 'client'].includes(role)) {
            return res.status(400).json({ message: 'Rôle invalide' });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const nouvelUtilisateur = await UtilisateurModel.create({
            nom,  
            email, 
            password: hashedPassword, 
            role
        });

        console.log('Nouvel utilisateur créé:', nouvelUtilisateur);

        // Génération et stockage de l'OTP
        const otp = generateOTP();
        const expiryTime = new Date(Date.now() + 5 * 60000);

        await UtilisateurModel.storeOTP(nouvelUtilisateur.id_utilisateur, otp, expiryTime);

        // Envoi de l'email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vérification de votre compte',
            html: `
                <h1>Bienvenue sur notre plateforme</h1>
                <p>Votre code de vérification est : <strong>${otp}</strong></p>
                <p>Ce code expirera dans 5 minutes.</p>
            `
        });

        res.status(201).json({
            message: 'Inscription réussie. Veuillez vérifier votre email',
            userId: nouvelUtilisateur.id_utilisateur
        });
    } catch (error) {
        console.error("Erreur inscription:", error);
        res.status(500).json({ 
            message: 'Erreur lors de l\'inscription',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Nouvelle fonction pour vérifier l'OTP
const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        
        // Validation des entrées
        if (!userId || !otp) {
            return res.status(400).json({ 
                message: 'UserId et OTP sont requis' 
            });
        }

        console.log('Tentative de vérification OTP:', { userId, otp });

        // Vérification de l'OTP
        const verification = await UtilisateurModel.verifyOTP(userId, otp);
        console.log('Résultat vérification:', verification);

        
        // Marquer comme vérifié
        await UtilisateurModel.markAsVerified(userId);

        // Génération du token
        const token = jwt.sign(
            { 
                userId: verification.id_utilisateur, 
                role: verification.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Email vérifié avec succès',
            token,
            utilisateur: {
                id: verification.id_utilisateur,
                nom: verification.nom,
                email: verification.email,
                role: verification.role
            }
        });
    } catch (error) {
        console.error("Erreur vérification OTP:", error);
        res.status(500).json({ 
            message: 'Erreur lors de la vérification',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Fonction pour renvoyer l'OTP
const resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        const utilisateur = await UtilisateurModel.findById(userId);

        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const otp = generateOTP();
        const expiryTime = new Date(Date.now() + 5 * 60000);
        await UtilisateurModel.storeOTP(userId, otp, expiryTime);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: utilisateur.email,
            subject: 'Nouveau code de vérification',
            html: `
                <h1>Nouveau code de vérification</h1>
                <p>Votre nouveau code est : <strong>${otp}</strong></p>
                <p>Ce code expirera dans 5 minutes.</p>
            `
        });

        res.json({ message: 'Nouveau code envoyé avec succès' });
    } catch (error) {
        console.error("Erreur renvoi OTP:", error);
        res.status(500).json({ message: 'Erreur lors du renvoi du code' });
    }
};

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  loginUtilisateur, 
  updateUtilisateur,
  deleteUtilisateur,
  register,
  verifyOTP,
  resendOTP
};