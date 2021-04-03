const express = require('express');
const boardController = require('../../controllers/boardController');
const router = express.Router();

router.post('/new', 
    boardController.createBoardAndStartGame
);

module.exports = router;