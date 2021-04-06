const Player = require('./Player');
module.exports = class Board {

    static get BOMB_VALUE() {return 'BOMB'}
    static get FULL_PORCENT() {return 100}
    //Función que crea el tablero sin bombas, y asigna el jugador a dicha tabla.
    static createBoard(gameBoard, columns, user, difficulty){
        Player.createNewUser(gameBoard, user);   
        for(let i = 0; i < (columns * columns) * (Board.FULL_PORCENT - (difficulty * Board.FULL_PORCENT))/Board.FULL_PORCENT; i++){
            gameBoard.board.push({
                isRevealed : false,
                hasFlag : false,
                value : i
            })
        }
        return gameBoard;
    }

    //Función que crea las bombas según la cantidad de cuadrículas no bombas.
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

    //Función que mezcla las bombas con el resto del tablero, y a su vez genera posiciones Ramdon para cada una
    //de las partidas.
    static createFullBoard(gameBoard, columns, user, difficulty){
        let board = Board.createBoard(gameBoard, columns, user, difficulty);
        let bombs = Board.assignBombs(columns, difficulty);
        let mixTable = board;
        bombs = board.board.concat(bombs);
        mixTable.board = bombs;
        mixTable.board = mixTable.board.sort(() => Math.random() -0.5);
        mixTable.board = mixTable.board.sort(() => Math.random() -0.9);
        mixTable.board = Board.whereIsTheBomb(mixTable.board, columns);
        mixTable.board = Board.assignPosition(mixTable.board);
        return mixTable;
    }

    //Función que según donde se encuentre ubicada la bomba le asigna el valor a cada objeto del array Board
    //y es la que indica a cuantas cuadrículas de distancia de la misma en cualquiera de los sentidos ya sea arriba, 
    //abajo, derecha e izquierda se encuentra una bomba.
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

    //Función que asigna la posición en el tablero de cada cuadrícula.
    static assignPosition(array){
        for(let i = 0; i < array.length; i++){
            array[i].position = i
        }
        return array;
    }

    //Función que asigna el nuevo valor de cada objeto del array de Board, en una petición PUT que actualiza el registro
    //en la base de datos.
    static saveAndUpdateGame(gameBoard, data){
        for(let i = 0; i < data.board.length; i++){
            gameBoard.board[i] = data.board[i];
        }
    }
}