const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/game', require('./routes/game'));

module.exports = app;

