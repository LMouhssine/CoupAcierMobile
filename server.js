const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./backend/routes/userRoutes');

app.use('/users', userRoutes);

// Logs pour vérifier les valeurs des variables d'environnement
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PWD:', process.env.DB_PWD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('PORT_NUMBER:', process.env.PORT_NUMBER);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // Spécifiez le chemin du socket pour MAMP
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

const port = process.env.PORT_NUMBER || 5001;
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
