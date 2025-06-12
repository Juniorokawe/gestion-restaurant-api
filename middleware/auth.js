const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Vérifier si le header Authorization existe
    if (!req.headers.authorization) {
      return res.status(401).json({ 
        message: 'Token d\'authentification manquant' 
      });
    }

    // Vérifier le format du token (Bearer)
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Format du token invalide' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Vérifier si le token est présent
    if (!token) {
      return res.status(401).json({ 
        message: 'Token non fourni' 
      });
    }

    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations utilisateur à la requête
    req.userData = { 
      userId: decodedToken.userId, 
      role: decodedToken.role,
      email: decodedToken.email // Ajout de l'email si nécessaire
    };

    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    
    // Messages d'erreur plus spécifiques
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expiré' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Token invalide' 
      });
    }

    res.status(401).json({ 
      message: 'Authentification requise',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// middleware/auth.js
module.exports.auth = (req, res, next) => {
  // Authentification simple ou logique de vérification de token ici
  next();
};
