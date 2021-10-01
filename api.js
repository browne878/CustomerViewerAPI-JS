const express = require('express');
const app = express();
const helmet = require('helmet');
const customers = require('./routes/customers');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');

app.use(express.json());
app.use(helmet());
app.use('/api/customers', customers);
app.use('/api/auth', auth);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
};

mongoose.connect(config.get('connString'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));