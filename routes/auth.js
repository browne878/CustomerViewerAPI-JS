const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User, validate} = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // 400 bad request

    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Username or Password is Incorrect');

    if (user.password !== req.body.password) return res.status(400).send('Username or Password is Incorrect');

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;
