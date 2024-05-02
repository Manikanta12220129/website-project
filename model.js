const mongo = require('mongoose');

const userdataSchema = new mongo.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        
    }
});

const UserData = mongo.model('UserData', userdataSchema);

module.exports = UserData