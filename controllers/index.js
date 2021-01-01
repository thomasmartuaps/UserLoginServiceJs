const User = require("../models/User");
const { hashString, checkString } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

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
                token: generateToken({
                    id: result._id,
                    email: result.email
                })
            }
            ))
            .catch(e => {
                if(e.name === "MongoError" && e.code === 11000) {
                    res.status(400).json({
                        errMsg: "Email already exists."
                    })
                } else if(e.errors.email) {
                    res.status(400).json({
                        errMsg: e.errors.email.message
                    })
                } else {
                    res.status(500).json({
                        error: e
                    })
                }
            })
    }

    static login (req, res) {
        User.findOne({ email: req.body.email })
            .then(result => {
                if (result) {
                    if (checkString(req.body.password, result.pass)) {
                        res.status(200).json({
                            message: "Login success!",
                            token: generateToken({
                                id: result._id,
                                email: result.email
                            })
                        })
                    } else {
                        res.status(400).json({
                            message: "Wrong email or password."
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "Wrong email or password."
                    })
                };
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({
                    error: e
                })
            })
    }
}

module.exports = Controller;