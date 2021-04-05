const GameModel = require('../models/GameModel');
module.exports = validUserName = async (req, res, next) => {
    try {
        const { userName } = req.body;
        const game = await GameModel.findOne({userName : userName});
        if(game){
            return res.status(400).json({message : 'Oops esto nombre de usuario no esta disponible'});
        }
        return next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Intenal Server Error'});
    }
}