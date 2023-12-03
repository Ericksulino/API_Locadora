const route = require("express").Router();
const secureController = require('../controllers/secure.controller');

route.post("/",secureController.create);

module.exports = route;