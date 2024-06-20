const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { companyName, siretNumber, companyAddress, addressComplement, email, phoneNumber, password } = req.body;

    // Vérifiez que toutes les données nécessaires sont présentes
    if (!companyName || !siretNumber || !companyAddress || !email || !phoneNumber || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un objet userData avec les données de l'utilisateur
    const userData = {
      companyName,
      siretNumber,
      companyAddress,
      addressComplement,
      email,
      phoneNumber,
      password: hashedPassword,
    };

    // Insérer les données de l'utilisateur dans la base de données
    User.create(userData, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Erreur de la base de données' });
      }
      res.status(201).json({ message: 'Utilisateur enregistré avec succès', userId: results.insertId });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};
