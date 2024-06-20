const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./backend/routes/userRoutes');

app.use('/users', userRoutes);

const port = process.env.PORT_NUMBER || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
