const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { hashString } = require("../helpers/bcrypt");
require('dotenv').config();

const connection = mongoose.createConnection(`${process.env.MONGOURI}/${process.env.DB_NAME}`)

const UserSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: ['@', "Invalid email."]
    },
    pass: {
        type: String,
        required: true,
        minlength: [4, "Password require at least 4 characters."]
    }
})

module.exports = User = connection.model("user", UserSchema);