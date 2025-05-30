// utils/refGenerator.js
function generateUniqueRef() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `REF-${timestamp}-${random}`;
}

module.exports = { generateUniqueRef };
