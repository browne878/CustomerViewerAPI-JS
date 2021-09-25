const app = require('express')();
const config = require('config');

console.log(`Connection String: ${config.get('database.connString')}`);