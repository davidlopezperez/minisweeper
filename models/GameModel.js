const mongoose = require('mongoose');

const MinisweeperGameSchema = new mongoose.Schema({

    board : {
        type : [{
            isRevealed : {
                type : Boolean,
                default : false
            },
            hasFlag : {
                type : Boolean,
                default : false
            },
            value : Number || String,
            position : Number
        }]
    }
});

module.exports = mongoose.model('board', MinisweeperGameSchema);