const bcrypt = require("bcryptjs");

function hashString(string) {
    return bcrypt.hashSync(string, 10);
}

function checkString(string) {
    return bcrypt.compareSync(string, 10)
}

module.exports = {
    hashString,
    checkString
}