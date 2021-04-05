const express = require('express');
const boardController = require('../../controllers/boardController');
const validUserName = require('../../middleware/validUserName');
const router = express.Router({
    mergeParams : true
});

router.post('/new', 
    validUserName,
    boardController.createBoardAndStartGame
);

module.exports = router;