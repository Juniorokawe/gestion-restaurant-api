const express = require('express');
const axios = require('axios');
const router = express.Router();

const { generateUniqueRef } = require('../utils/refGenerator');
const { getTokenFromDB } = require('../utils/tokenManager');

// La route est correctement définie ici, avec `req` accessible
router.post('/payer', async (req, res) => {
  const {
    montant,
    tel_client,
    operateur = 'airtel',
    redirect = process.env.PVIT_REDIRECT_URL,
    agent = process.env.PVIT_AGENT || 'default'
  } = req.body;

  const ref = generateUniqueRef();
  const token = await getTokenFromDB();
  const tel_marchand = process.env.PVIT_MARCHAND;

  const payload = new URLSearchParams({
    tel_marchand,
    montant,
    ref,
    tel_client,
    token,
    action: 'payment',
    service: 'REST',
    operateur,
    redirect,
    agent
  });

  try {
    const response = await axios.post(
      'https://mypvit.com/pvit-secure-full-api.kk',
      payload.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.status(200).send(response.data);
  } catch (error) {
    console.error('Erreur lors de la transaction PVit:', error);
    res.status(500).json({ message: 'Erreur lors de la transaction PVit' });
  }
});

module.exports = router;

router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'La route /test fonctionne bien ! 🚀'
  });
});

