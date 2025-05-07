// server.js
require('dotenv').config(); // Charger les variables d'environnement en premier
const express = require('express');
// On importe le pool ici juste pour le log initial, mais il n'est pas utilisé directement
const pool = require('./config/database');

// Importe les routeurs
const administrateurRoutes = require('./routes/administrateurRoutes');
const categorieRoutes = require('./routes/categorieRoutes'); 
const clientRoutes = require('./routes/clientRoutes');       
const commandeRoutes = require('./routes/commandeRoutes');    
const livraisonRoutes = require('./routes/livraisonRoutes');  
const livreurRoutes = require('./routes/livreurRoutes');      
const platRoutes = require('./routes/platRoutes');          
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
const port = process.env.PORT || 3000; // Utilise le port du .env ou 3000 par defaut

// Middleware essentiel pour parser le JSON des requêtes
app.use(express.json());
// Middleware pour parser les données de formulaire URL-encoded (optionnel mais utile)
app.use(express.urlencoded({ extended: true }));

// Middleware simple pour logger les requêtes (optionnel)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Montage des routes - Utiliser un préfixe comme /api/v1 est une bonne pratique
const apiPrefix = '/api/v1';
app.use(`${apiPrefix}/administrateurs`, administrateurRoutes);
app.use(`${apiPrefix}/categories`, categorieRoutes);     
app.use(`${apiPrefix}/clients`, clientRoutes);        
app.use(`${apiPrefix}/commandes`, commandeRoutes);      
app.use(`${apiPrefix}/livraisons`, livraisonRoutes);    
app.use(`${apiPrefix}/livreurs`, livreurRoutes);        
app.use(`${apiPrefix}/plats`, platRoutes);           
app.use(`${apiPrefix}/restaurants`, restaurantRoutes);  


// Middleware de gestion d'erreur "attrape-tout" (doit être défini APRES les routes)
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue' });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/administrateurs`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/categories`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/clients`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/commandes`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/livraisons`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/livreurs`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/plats`);
  console.log(`Endpoints Admin : http://localhost:${port}${apiPrefix}/restaurants`);
  // Logguez les autres endpoints ici...
});