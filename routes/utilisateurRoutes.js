const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const auth = require('../middleware/auth');

// Middleware de log pour debug
router.use((req, res, next) => {
  console.log(`Route utilisateur appelée: ${req.method} ${req.url}`);
  next();
});


// Routes publiques (sans authentification)
router.post('/inscription', utilisateurController.register);
router.post('/connexion', utilisateurController.loginUtilisateur); // Utilisez loginUtilisateur au lieu de login
router.post('/verify-otp', utilisateurController.verifyOTP);
router.post('/resend-otp', utilisateurController.resendOTP);

// Routes protégées (avec authentification)
router.use(auth);
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.put('/:id', utilisateurController.updateUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;