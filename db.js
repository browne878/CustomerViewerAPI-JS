const mongoose = require('mongoose');
const config = require('config');

class Database {
    #Customer;
    #customerSchema

    constructor() {
        this.#customerSchema = new mongoose.Schema({
            first_name: String,
            last_name: String,
            email: String,
            age: Number
        });

        this.#Customer = mongoose.model('Customer', this.#customerSchema);
    }

    #Connect() {
        mongoose.connect(config.get('database.connString'))
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.error('Could not connect to MongoDB...' + err));
    }

    #Disconnect() {
        mongoose.disconnect()
            .then(() => console.log('Disconnected from MongoDB...'))
            .catch(err => console.error('Failed to Disconnect from MongoDB...' + err));
    }

    async CreateCustomer(){
        this.#Connect();

        // Validate Customer
        
        const result = await customer.save();
        console.log(result)

        this.#Disconnect();
    }
}

module.exports = Database;