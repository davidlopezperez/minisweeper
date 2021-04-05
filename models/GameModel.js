const mongoose = require('mongoose');

const MinisweeperGameSchema = new mongoose.Schema({

    player : {
        type : {
            userName : {
                type : String,
                require : true,
                unique : true,
            }
        },
        default : Object
    },
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
            value : String,
            position : Number
        }]
    }
});

module.exports = mongoose.model('board', MinisweeperGameSchema);