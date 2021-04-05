const Player = require('./Player');
module.exports = class Board {

    static get BOMB_VALUE() {return 'BOMB'}
    static get FULL_PORCENT() {return 100}
    //Esta función me crea el tablero completo.
    static createBoard(gameBoard, columns, userName, difficulty){
        Player.createNewUser(gameBoard, userName);   
        for(let i = 0; i < (columns * columns) * (Board.FULL_PORCENT - (difficulty * Board.FULL_PORCENT))/Board.FULL_PORCENT; i++){
            gameBoard.board.push({
                isRevealed : false,
                hasFlag : false,
                value : i
            })
        }
        return gameBoard;
    }

    //Esta función coloca las bombas aleatoriamente.
    static assignBombs(columns, difficulty){
        let bombs = Array((columns * columns) * difficulty).fill(Board.BOMB_VALUE);
        let array = [];
        bombs.forEach(bomb => {
            array.push({
                isRevealed : false,
                hasFlag : false,
                value : bomb,
            })
        })
        return array;
    }

    //Esta función mezcla las bombas con la tabla
    static createFullBoard(gameBoard, columns, userName, difficulty){
        let board = Board.createBoard(gameBoard, columns, userName, difficulty);
        let bombs = Board.assignBombs(columns, difficulty);
        let mixTable = board;
        mixTable.board = board.board.concat(bombs);
        mixTable.board = mixTable.board.sort(() => Math.random() -0.5);
        mixTable.board = mixTable.board.sort(() => Math.random() -0.9);
        mixTable = Board.assignPosition(mixTable);
        mixTable = Board.whereIsTheBomb(mixTable, columns);
        return mixTable;
    }

    //Esta función ubica las bombas.
    static whereIsTheBomb(gameBoard, columns){
        
        for (let i = 0; i < gameBoard.length; i++) {
            let total = 0
            const isLeftEdge = (i % columns === 0)
            const isRightEdge = (i % columns === columns -1)
      
            if (gameBoard[i].value !== Board.BOMB_VALUE) {
              if (i > 0 && !isLeftEdge && gameBoard[i -1].value === Board.BOMB_VALUE) total ++
              if (i > 9 && !isRightEdge && gameBoard[i + 1 -columns].value === Board.BOMB_VALUE) total ++
              if (i > 10 && gameBoard[i -columns].value === Board.BOMB_VALUE) total ++
              if (i > 11 && !isLeftEdge && gameBoard[i -1 -columns].value === Board.BOMB_VALUE) total ++
              if (i < 98 && !isRightEdge && gameBoard[i +1].value === Board.BOMB_VALUE) total ++
              if (i < 90 && !isLeftEdge && gameBoard[i -1 +columns].value === Board.BOMB_VALUE) total ++
              if (i < 88 && !isRightEdge && gameBoard[i +1 +columns].value === Board.BOMB_VALUE) total ++
              if (i < 89 && gameBoard[i +columns].value === Board.BOMB_VALUE) total ++
              gameBoard[i].value = total;
            }
            
          }
          return gameBoard;
          
    }

    //Función que asigna el position
    static assignPosition(array){
        for(let i = 0; i < array.length; i++){
            array[i].board.position = i
        }
        return array;
    }
}