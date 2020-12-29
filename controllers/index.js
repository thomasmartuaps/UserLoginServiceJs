const User = require("../models/User");
const { hashString } = require("../helpers/bcrypt");

class Controller {
    static register (req, res) {
        console.log({
            email: req.body.email
        })
        User.create({
            email: req.body.email,
            pass: hashString(req.body.password),
        })
            .then(result => res.status(200).json({
                message: "Create success!",
                data: result
            }
            ))
            .catch(e => {
                if(e.keyValue.email === req.body.email) {
                    res.status(400).json({
                        errMsg: "Email already exists."
                    })
                } else {
                    res.status(500).json({
                        error: e
                    })
                }
            })
    }

    static login (req, res) {
        res.status(200).json({ message: "API under construction." })
    }
}

module.exports = Controller;