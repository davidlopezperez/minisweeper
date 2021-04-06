const UsersModel = require('../models/UsersModel');


//Controlador y middleware a su vez de la ruta MEHOTD: POST; /api/game/new que se encarga de guardar un usuario nuevo en la base de datos.
exports.createUser = async (req, res, next) => {
    try {
        let user = res.user !== undefined ? res.user : new UsersModel();
        const { userName } = req.body;
        user.userName = userName;
        await user.save();
        res.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}

//Controlador de la ruta /api/game/new METHOD: POST; que le agrega al usuario un objeto de la tabla que inicio a jugar.
exports.addGameBoard = async (req, res) => {
    try {
        let user = res.user;
        let game = res.game;
        user.games.push(game._id);
        await user.save();
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}