const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 5000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://yourfrontenddomain.com'], // whitelist
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
  credentials: true, // enable cookies/auth headers if needed
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect('mongodb+srv://sarman:sarman@cluster0.xfikpeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', formRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});