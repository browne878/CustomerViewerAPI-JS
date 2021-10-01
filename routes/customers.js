const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const customers = await Customer.find().sort('first_name');
    res.send(customers);
});

router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('Customer Not Found');

    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await Customer.findByIdAndUpdate(req.params.id, new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
    }, { new: true }));

    if (!result) return res.status(400).send('Customer Not Found');

    res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)

    if (!customer) return res.status(400).send('Customer Not Found');

    res.send(customer);
});

module.exports = router;