const Car = require("../models/Car");

const createService = (body) => Car.create(body);

const findAllService = (offset, limit) => Car.find().sort({_id: -1}).skip(offset).limit(limit).populate("locatario");

const countCars = () => Car.countDocuments();

const topCarService = () => Car.findOne().sort({_id: -1}).populate("locatario");

const findByIdService = (id) => Car.findById(id).populate("locatario");

const searchByNomeService = (nome) => Car.find({
    nome: {$regex: `${nome || ''}`, $options: "i"},
}).sort({_id: -1}).populate("locatario");

const byUserService = (id) => Car.find({locatario: id}).sort({_id: -1}).populate("locatario");

const filterByCategoryService = (categoria) => Car.find({
    categoria: {$regex: `${categoria || ''}`, $options: "i"},
}).sort({_id: -1}).populate("locatario");

const filterByTypeService = (tipo) => Car.find({
    tipo: {$regex: `${tipo || ''}`, $options: "i"},
}).sort({_id: -1}).populate("locatario");

const updateService = (id, nome, categoria, tipo, descricao, valor, foto) => 
    Car.findOneAndUpdate(
        {_id: id},
        {nome, categoria, tipo, descricao, valor, foto},
        {rawResult: true}
    );

const updateRentDates = async (id, dataInicioLocacao, dataTerminoLocacao, disponivel) => {
    const updatedCar = await Car.findByIdAndUpdate(
        id,
        {
            $set: {
                dataInicioLocacao,
                dataTerminoLocacao,
                disponivel,
            },
        },
        { new: true }
    );

    return updatedCar;
};

const addLocatarioService = async (carId, userId) => {
        const updatedCar = await Car.findOneAndUpdate(
            {_id: carId},
            {locatario: userId},
            {new: true} // Retorna o documento atualizado
        );
    
        return updatedCar;
};
    
const removeLocatarioService = async (carId) => {
    const updatedCar = await Car.findOneAndUpdate(
        {_id: carId},
        {locatario: null},
        {new: true} // Retorna o documento atualizado
    );

    return updatedCar;
};



const eraseService = (id) => Car.findByIdAndDelete({_id: id});

module.exports = {
    createService,
    findAllService,
    findByIdService,
    countCars,
    topCarService,
    searchByNomeService,
    byUserService,
    filterByCategoryService,
    filterByTypeService,
    updateService,
    updateRentDates,
    addLocatarioService,
    removeLocatarioService,
    eraseService
};
