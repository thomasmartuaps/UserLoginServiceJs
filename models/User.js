const mongoose = require("mongoose");
const schema = mongoose.Schema;
require('dotenv').config();

const connection = mongoose.createConnection(`${process.env.MONGOURI}/${process.env.DB_NAME}`)

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // minlength: [3, "Email require at least 3 characters."]
    },
    pass: {
        type: String,
        required: true,
        minlength: [4, "Password require at least 4 characters."]
    }
})

module.exports = User = connection.model("user", UserSchema);