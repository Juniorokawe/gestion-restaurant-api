// utils/tokenManager.js
async function getTokenFromDB() {
  return process.env.PVIT_API_TOKEN || 'FAKE-TOKEN';
}

module.exports = { getTokenFromDB };
