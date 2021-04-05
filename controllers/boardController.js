const Board = require('../helpers/Board');
const GameModel = require('../models/GameModel');

exports.createBoardAndStartGame = async (req, res) => {
    try {
        let { columns, userName, difficulty } = req.body;
        let gameBoard = new GameModel(req.body);
        gameBoard = Board.createFullBoard(gameBoard, columns, userName, difficulty);
        await gameBoard.save();
        res.json(gameBoard)
    } catch (error) {
        console.log(error);
    }
}

exports.saveAGame = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}