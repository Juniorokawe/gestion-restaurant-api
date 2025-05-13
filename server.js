// server.js
require('dotenv').config(); // Charger les variables d'environnement en premier
const express = require('express');
const cors = require('cors'); // Ajoutez cette ligne
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
const port = 2400; // Utilise le port du .env ou 3000 par defaut

// Activer CORS pour toutes les routes
app.use(cors());

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

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);

});