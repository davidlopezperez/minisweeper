module.exports = class Player{

    //Función que crea dentro del objeto board el jugador.
    static createNewUser(board, user){
        board.player = user._id;
    }
}