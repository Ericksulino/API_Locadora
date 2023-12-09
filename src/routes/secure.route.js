const route = require("express").Router();
const secureController = require('../controllers/secure.controller');

route.post("/",secureController.create);

route.get("/", secureController.findAll);

module.exports = route;