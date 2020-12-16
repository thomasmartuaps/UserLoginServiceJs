const { MongoClient } = require("mongodb");
const { hashString } = require("../helpers/bcrypt");

function userModel (email, password) {
    if (password.length >= 4) {
        return {
            email: email,
            pass: hashString(password)
        };
    }
    else {
        throw {
            message: "Password must be at least 4 characters."
        }
    }
    // Add validations here
}

module.exports = userModel;