const UsersModel = require('../models/UsersModel');

//Middleware que detecta si un jugador es un jugador nuevo o uno ya existente.
module.exports = validUserName = async (req, res, next) => {
    try {
        const { userName } = req.body;
        const user = await UsersModel.findOne({userName : userName});
        if(user){
            res.user = user;
        }
        return next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Intenal Server Error'});
    }
}