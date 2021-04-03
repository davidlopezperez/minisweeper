const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const PORT = 4000;
app.use('/api/game', require('./routes/game'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`)
});

