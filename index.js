const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const formRoutes = require('./routes/formRoutes');
const prerender = require('prerender-node');
require('dotenv').config();

// Enable CORS and JSON body parsing

// Setup prerender
app.use(
  prerender
    .set('prerenderToken', 'h6hlaIEOJH9gBtlmTbr6') // Optional if using prerender.io
    .whitelisted(['/']) // Add more routes if needed
);

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI

const corsOptions = {
  origin: ['http://localhost:3000', 'https://willowy-chebakia-b11210.netlify.app'], // whitelist
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

// Serve frontend build
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});