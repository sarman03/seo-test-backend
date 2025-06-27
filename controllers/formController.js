const Form = require('../models/formModel');

exports.submitForm = async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(201).send('Form data saved successfully!');
  } catch (error) {
    res.status(400).send('Error saving form data: ' + error.message);
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).send('Error fetching form data: ' + error.message);
  }
};