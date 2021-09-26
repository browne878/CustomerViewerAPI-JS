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

    async CreateCustomer(){

        // Validate Customer
        
        const result = await customer.save();
        console.log(result)
    }

    async GetCustomers(){
        const customers = await this.#Customer.find();
        console.log(customers);
    }

    async UpdateCustomer(id, changedCustomer) {

        const customer = await this.#Customer.findById(id);
        if (!customer) return console.log('Customer Not Found...');

        //edit customer

        const result = await customer.save();
        console.log(result);
    }

    async RemoveCustomer(id){
        const customer = await this.#Customer.findByIdAndRemove(id);
        console.log(customer);
    }
}

module.exports = Database;