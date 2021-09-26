const express = require('express');
const router = express.Router();
const Database = require('../db');

const db = new Database;

router.get('/', (req, res) => {
    db.GetCustomers().then(result => {
        console.log(result);
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    //Get Customer by ID
});

router.post('/', (req, res) => {
    //Add New Customer
});

router.put('/:id', (req, res) => {
    //Update Customer
});

router.delete('/:id', (req, res) => {
    //Delete Single Customer
});

function validateCustomer(customer) {
    //Validate Customer
}

module.exports = router;