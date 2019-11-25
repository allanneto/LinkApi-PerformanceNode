const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    cpf: {
        type: String,
        unique: true
    },
    address: {
        city: String,
        country: String,
        phone: String,
        state: String,
        street: String,
        zipCode: String
    },
    birthDay: Date,
    email: String,
    userName: String,
    password: String
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);  