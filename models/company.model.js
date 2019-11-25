const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    companyName: String,
    companySuffix: String,
    address: {
        city: String,
        country: String,
        phone: String,
        state: String,
        street: String,
        zipCode: String
    }
}, {
    timestamps: true,
});

module.exports = model('Company', userSchema);  