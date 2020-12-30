const mongoose = require("mongoose");
const schema = mongoose.Schema;
require('dotenv').config();

const connection = mongoose.createConnection(`${process.env.MONGOURI}/${process.env.DB_NAME}`);

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: [ true, "Email already exists." ],
        match: [emailRegex, "Invalid email"]
    },
    pass: {
        type: String,
        required: true,
        minlength: [4, "Password require at least 4 characters."]
    }
});

module.exports = User = connection.model("user", UserSchema);