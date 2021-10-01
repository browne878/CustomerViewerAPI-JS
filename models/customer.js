const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    age: Joi.number().min(18).max(120)
  });

  return schema.validate(customer);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;