module.exports = class Board {

    //Esta función me crea el tablero completo.
    static createBoard(gameBoard, columns){
        for(let i = 0; i < (columns * columns) * 0.80; i++){
            gameBoard.board.push({
                isRevealed : false,
                hasFlag : false,
                value : i
            })
        }
        return gameBoard;
    }

    //Esta función coloca las bombas aleatoriamente.
    static assignBombs(columns){
        let bombs = Array((columns * columns) * 0.20).fill('BOMB');
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
    static putTheBombsOnTheTable(gameBoard, columns){
        let board = Board.createBoard(gameBoard, columns)
        let bombs = Board.assignBombs(columns)
        let mixTable = board.board.concat(bombs);
        mixTable = mixTable.sort(() => Math.random() -0.5);
        mixTable = mixTable.sort(() => Math.random() -0.9);
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
      
            if (gameBoard[i].value !== 'BOMB') {
              if (i > 0 && !isLeftEdge && gameBoard[i -1].value === 'BOMB') total ++
              if (i > 9 && !isRightEdge && gameBoard[i + 1 -columns].value === 'BOMB') total ++
              if (i > 10 && gameBoard[i -columns].value === 'BOMB') total ++
              if (i > 11 && !isLeftEdge && gameBoard[i -1 -columns].value === 'BOMB') total ++
              if (i < 98 && !isRightEdge && gameBoard[i +1].value === 'BOMB') total ++
              if (i < 90 && !isLeftEdge && gameBoard[i -1 +columns].value === 'BOMB') total ++
              if (i < 88 && !isRightEdge && gameBoard[i +1 +columns].value === 'BOMB') total ++
              if (i < 89 && gameBoard[i +columns].value === 'BOMB') total ++
              gameBoard[i].value = total;
            }
            
          }
          return gameBoard;
          
    }

    //Función que asigna el position
    static assignPosition(array){
        for(let i = 0; i < array.length; i++){
            array[i].position = i
        }
        return array;
    }
}