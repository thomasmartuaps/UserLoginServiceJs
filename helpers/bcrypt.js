const bcrypt = require("bcryptjs");

function hashString(string) {
    return bcrypt.hashSync(string, 10);
}

function checkString(string, hash) {
    return bcrypt.compareSync(string, hash)
}

module.exports = {
    hashString,
    checkString
}