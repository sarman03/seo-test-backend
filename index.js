const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const formRoutes = require('./routes/formRoutes');
require('dotenv').config();
// ... existing code ...

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI

const corsOptions = {
  origin: ['http://localhost:3000', 'https://yourfrontenddomain.com'], // whitelist
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
  credentials: true, // enable cookies/auth headers if needed
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.log(err));

app.use('/api', formRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});