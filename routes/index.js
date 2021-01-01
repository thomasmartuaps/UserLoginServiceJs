const express = require("express");
const routes = express.Router();
const Controller = require('../controllers');

routes.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
});
routes.post("/register", Controller.register);
routes.post("/login", Controller.login);

module.exports = routes;