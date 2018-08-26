const mongoose = require('mongoose');
const joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true ,
        min: 5,
        max: 50,
        },
    email: { 
        type: String,
        required: true ,
        min: 5,
        max: 255,
        unique: true
        },
    password: { 
        type: String,
        required: true ,
        min: 5,
        max: 1024
        }
});

const User = mongoose.model('User', UserSchema);

const schema = {
    name: joi.string().max(50).min(5).required(),
    email: joi.string().max(255).min(5).required().email(),
    password: joi.string().max(255).min(5).required(),
};

module.exports.validate = (obj) => {
    return joi.validate(obj, schema);
}
module.exports.User = User;

    