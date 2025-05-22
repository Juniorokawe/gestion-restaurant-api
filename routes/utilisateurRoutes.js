const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const auth = require('../middleware/auth');

// Middleware de log pour debug
router.use((req, res, next) => {
  console.log(`Route utilisateur appelée: ${req.method} ${req.url}`);
  next();
});


// Routes publiques
router.post('/register', utilisateurController.createUtilisateur);
router.post('/login', utilisateurController.loginUtilisateur);

// Routes protégées
router.use(auth);
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.put('/:id', utilisateurController.updateUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;