const express = require('express');
const boardController = require('../../controllers/boardController');
const userController = require('../../controllers/userController');
const validUserName = require('../../middleware/validUserName');
const validGame = require('../../middleware/validGame');
const gamesByUsername = require('../../middleware/gamesByUsername');
const router = express.Router();

router.post('/new',
    validUserName,
    userController.createUser,
    boardController.createBoardAndStartGame,
    userController.addGameBoard
);

router.put('/save/:id', 
    validGame,
    boardController.saveAGame
);

router.post('/get', 
    gamesByUsername,
    boardController.getGamesByPlayer
);

module.exports = router;