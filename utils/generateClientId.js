const generateClientId = (nom) => {
  // Garde uniquement la première lettre en majuscule + reste en minuscule
  const cleanName = nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();

  // Lettre aléatoire (A-Z)
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // 3 chiffres aléatoires
  const randomNumber = Math.floor(100 + Math.random() * 900);

  return `${cleanName}${randomLetter}${randomNumber}`;
};

module.exports = generateClientId;
