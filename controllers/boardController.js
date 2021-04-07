const Board = require('../helpers/Board');
const GameModel = require('../models/GameModel');


//Controlador de la ruta /api/game/new que guarda la tabla de juego en la base de datos.
exports.createBoardAndStartGame = async (req, res, next) => {
    try {
        let { columns, difficulty } = req.body;
        const user = res.user;
        let gameBoard = new GameModel(req.body);
        gameBoard = Board.createFullBoard(gameBoard, columns, user, difficulty);
        await gameBoard.save();
        res.game = gameBoard;
        next();
    } catch (error) {
        console.log(error);
    }
}


//Controlador de la ruta /api/game/save/:id METODO: POST; que actualiza una partida iniciada.
exports.saveAGame = async (req, res) => {
    try {
        let gameToSave = res.game;
        Board.saveAndUpdateGame(gameToSave, req.body);
        await gameToSave.save();
        res.json(gameToSave);
    } catch (error) {
        console.log(error);
    }
}

//Controlador de la ruta /api/game/get METODO: GET; que devuelve al cliente todas las partidas iniciadas y terminadas de un jugador
exports.getGamesByPlayer = async (req, res) => {
    try {
        const games = res.games;
        res.status(200).json(games.games);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}

exports.getOnlyOneGame = async (req, res) => {
    try {
        const game = res.game;
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}
