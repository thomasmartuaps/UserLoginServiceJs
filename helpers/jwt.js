const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(userData) {
    return jwt.sign(userData, process.env.SECRET);
};

function decodeToken(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    generateToken,
    decodeToken
};