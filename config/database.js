// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Charge les variables depuis .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limite de connexions dans le pool
  queueLimit: 0
});

// Optionnel : tester la connexion au démarrage
pool.getConnection()
  .then(connection => {
    console.log('Connecté à la base de données MySQL via le pool');
    connection.release(); // Libère la connexion pour qu'elle retourne au pool
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données:', err);
    // Envisagez de quitter l'application si la connexion échoue au démarrage
    // process.exit(1);
  });

module.exports = pool; // Exporte le pool pour l'utiliser ailleurs
