const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const connectDb = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology : true
        });
        console.log('Db connected');
    } catch (error) {
        console.log(error, 'ERROR 500');
        process.exit(1);
    }
}

module.exports = connectDb;