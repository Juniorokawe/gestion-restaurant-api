// controllers/clientController.js
const ClientModel = require('../models/clientModel');

// GET /clients
const getAllClients = async (req, res) => {
  try {
    const clients = await ClientModel.findAll();
    res.json(clients);
  } catch (error) {
    console.error("Erreur getAllClients:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des clients' });
  }
};

// GET /clients/:id
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await ClientModel.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    console.error("Erreur getClientById:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du client' });
  }
};

// POST /clients
const createClient = async (req, res) => {
  try {
    const { nom, prenom, phone, email, password } = req.body;
    const{image} = req.body; // Assurez-vous que l'image est envoyée dans le corps de la requête
    if (!nom || !prenom || !phone || !email || !password) {
        return res.status(400).json({ message: 'Veillez remplir tout les champs: nom, prenom, numéro de téléphone etc...' });
    }

    const nouveauClient = await ClientModel.create({ nom, prenom, phone, email, password, image });
    res.status(201).json({ message: 'Client ajouté', client: nouveauClient });
  } catch (error) {
    console.error("Erreur createClient:", error);
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la création du client' });
  }
};

// PUT /clients/:id
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, image } = req.body;

    const affectedRows = await ClientModel.update(id, { nom, prenom, email, image });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Client non trouvé pour la mise à jour' });
    }
    res.json({ message: 'Client mis à jour' });
  } catch (error) {
    console.error("Erreur updateClient:", error);
     if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre client.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du client' });
  }
};

// DELETE /clients/:id
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await ClientModel.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Client non trouvé pour la suppression' });
    }
    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    console.error("Erreur deleteClient:", error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ message: 'Impossible de supprimer ce client car il est référencé ailleurs.' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du client' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};