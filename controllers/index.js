const User = require("../models/User");

class Controller {
    static register (email, password) {
        User.create({
            email: email,
            pass: password,
        })
            .then(res => console.log("created."))
    }
}

module.exports = Controller;