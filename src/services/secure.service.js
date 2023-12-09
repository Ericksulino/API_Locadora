const Secure = require('../models/Secure')
const createService = (body) => Secure.create(body);

const findAllService = async () => {
    try {
        const seguros = await Secure.find();
        return seguros;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createService,
    findAllService
};