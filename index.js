const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
// const prerender = require('prerender-node');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// CORS Config
const corsOptions = {
  origin: ['http://localhost:3000', 'https://seotestfrontend.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


// app.use(
//   prerender
//     .set('prerenderToken', 'h6hlaIEOJH9gBtlmTbr6')
//     // .whitelisted(['/form', '/list']) 
// );

// API Routes
app.use('/api', formRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve frontend build
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });


// Connect to DB and start server once DB is connected
mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
