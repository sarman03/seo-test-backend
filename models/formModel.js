const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  company: String,
  age: Number,
  price: Number,
  history: String
});

module.exports = mongoose.model('Form', formSchema);