const Board = require('../helpers/Board');
const GameModel = require('../models/GameModel');

exports.createBoardAndStartGame = async (req, res) => {
    try {
        let { columns } = req.body;
        let gameBoard = new GameModel(req.body);
        gameBoard = Board.putTheBombsOnTheTable(gameBoard, columns);
        //console.log(bombs)
        //await gameBoard.save();
        res.json(gameBoard)
    } catch (error) {
        console.log(error);
    }
}