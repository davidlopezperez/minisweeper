const GameModel = require('../models/GameModel');

//Middleware de la ruta /api/game/save/:id METHOD: GET; que verifica que dicha partida que intenta guardar sea una partida valida.
module.exports = validGame = async (req, res, next) => {
    try {
        const game = await GameModel.findOne({_id : req.params.id});
        if(!game){
            return res.status(200).json({message : 'No se encuentra esta partida'})
        }
        res.game = game;
        return next();
    } catch (error) {
        console.log(error);
    }
}