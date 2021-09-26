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

    Connect() {
        mongoose.connect(config.get('database.connString'))
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.error('Could not connect to MongoDB...' + err));
    }

    async CreateCustomer(newCustomer){
        const customer = new this.#Customer({
            first_name: newCustomer.first_name,
            last_name: newCustomer.last_name,
            email: newCustomer.email,
            age: newCustomer.age
        });

        const result = await customer.save();
        return result;
    }

    async GetCustomers(){
        const customers = await this.#Customer.find();
        return customers;
    }

    async GetCustomer(id) {
        const customers = await this.#Customer.findById(id);
        return customers;
    }

    async UpdateCustomer(id, changedCustomer) {

        const customer = await this.#Customer.findById(id);
        if (!customer) return;

        customer.first_name = changedCustomer.first_name;
        customer.last_name = changedCustomer.last_name;
        customer.email = changedCustomer.email;

        // Checks if optional field is provided
        if (changedCustomer.age) customer.age = changedCustomer.age;

        const result = await customer.save();
        return result
    }

    async RemoveCustomer(id){
        const customer = await this.#Customer.findByIdAndRemove(id);
        return customer;
    }
}

module.exports = Database;