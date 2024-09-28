const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    image: {
        type: String,
        default: null
    },

},
    
    {
        timestamps: true
    }

);

const User = mongoose.model('User', userSchema);
module.exports = User;