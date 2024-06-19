const db = require("../config/db");

// Récupérer tous les clients
const getClients = (req, res) => {
  db.query("SELECT * FROM client", (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

// Créer un nouveau client
const createClient = (req, res) => {
  const { prenomClient, nomClient, motDePasse, codeGenere, siret, telephone, statutCompte, profilClient, email } = req.body;
  const query = "INSERT INTO client (prenomClient, nomClient, motDePasse, codeGenere, siret, telephone, statutCompte, profilClient, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [prenomClient, nomClient, motDePasse, codeGenere, siret, telephone, statutCompte, profilClient, email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ idClient: results.insertId, prenomClient, nomClient, email });
  });
};

module.exports = {
  getClients,
  createClient,
};
