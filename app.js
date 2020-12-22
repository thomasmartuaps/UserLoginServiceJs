const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(`${process.env.MONGOURI}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mongoDb.');
});

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));