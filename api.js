const express = require('express');
const app = express();
const helmet = require('helmet');
const customers = require('./routes/customers');

app.use(express.json());
app.use(helmet());
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));