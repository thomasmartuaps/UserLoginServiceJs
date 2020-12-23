const express = require("express");
const routes = express.Router();
const Controller = require('../controllers');

routes.post("/register", Controller.register);

module.exports = routes;