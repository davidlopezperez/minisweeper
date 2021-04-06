const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userName : {
        type : String
    },
    games : {
        type : [mongoose.Types.ObjectId],
        default : Array
    }
});

module.exports = mongoose.model('users', UsersSchema);