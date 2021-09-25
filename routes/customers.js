const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //Get all Customers
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