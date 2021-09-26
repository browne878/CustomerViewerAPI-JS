const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Database = require('../db');

const db = new Database;
db.Connect();

router.get('/', (req, res) => {
    db.GetCustomers().then(result => {
        console.log(result);
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    db.GetCustomer(req.params.id).then(result => {
        console.log(result);
        res.send(result);
    })
});

router.post('/', (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message); // 400 bad request

    const result = await db.CreateCustomer(req.body);

    res.send(result);
});

router.put('/:id', (req, res) => {
    //Update Customer
});

router.delete('/:id', (req, res) => {
    //Delete Single Customer
});

function validateCustomer(customer) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required(),
        age: Joi.number().greater(17)
    });

    return schema.validate(customer);
}

module.exports = router;