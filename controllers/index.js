const User = require("../models/User");

class Controller {
    static register (req, res) {
        User.create({
            email: req.body.email,
            pass: req.body.password,
        })
            .then(result => res.status(200).json({
                message: "Create success!",
                data: result
            }
            ))
            .catch(e => res.status(500).json({
                error: e
            }))
    }

    static login (req, res) {
        res.status(200).json({ message: "API under construction." })
    }
}

module.exports = Controller;