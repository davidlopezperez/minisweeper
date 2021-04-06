const UsersModel = require('../models/UsersModel');

//Middleware de la ruta /api/game/get METHOD: GET; que devuelve al cliente todas las partidas del jugador/usuario.
module.exports = gamesByUsername = async (req, res, next) => {
    try {
        const { userName } = req.body;
        const games = await UsersModel.findOne({userName : userName}).populate({
            path : 'games',
            model : 'board'
        });
        res.games = games;
        games !== undefined ? (next()) : (res.status(200).json({message : 'Este jugador no tiene ninguna pártida'}));
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}