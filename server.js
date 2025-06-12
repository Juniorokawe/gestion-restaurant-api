require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const middleware = require('./middleware/auth');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 2400;

// Test de connexion à la base de données
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à la base de données réussie');
    connection.release();
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
}
testConnection();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware d'authentification (à désactiver temporairement si besoin de tester sans auth)
app.use(middleware.auth);

// Importation des routes
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const livreurRoutes = require('./routes/livreurRoutes');
const platRoutes = require('./routes/platRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Définition des préfixes pour les routes
app.use('/api/v1/utilisateurs', utilisateurRoutes);
app.use('/api/v1/categories', categorieRoutes);
app.use('/api/v1/commandes', commandeRoutes);
app.use('/api/v1/livraisons', livraisonRoutes);
app.use('/api/v1/livreurs', livreurRoutes);
app.use('/api/v1/plats', platRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/payment', paymentRoutes);

// Route de test API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API opérationnelle ✅' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Route non trouvée
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
}).on('error', (err) => {
  console.error('❌ Erreur de démarrage du serveur:', err);
});

// Gestion des signaux d'arrêt
process.on('SIGTERM', () => {
  console.log('Signal SIGTERM reçu. Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Signal SIGINT reçu. Arrêt du serveur...');
  process.exit(0);
});
