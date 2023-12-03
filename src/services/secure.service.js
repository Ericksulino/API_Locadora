const Secure = require('../models/Secure')
const createService = (body) => Secure.create(body);

module.exports = {createService};