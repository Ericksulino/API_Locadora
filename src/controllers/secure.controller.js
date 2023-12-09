const secureService = require('../services/secure.service');

const create = async (req, res) => {
    try {
        const { descricao, coberturaDanos, valorCobertura, valorFranquia } = req.body;

        // Verifique se todos os campos necessários estão presentes
        if (!descricao || !coberturaDanos || !valorCobertura || !valorFranquia) {
            res.status(400).send({ mensagem: "Envie todos os campos para o registro!" });
        } else {
            try {
                // Crie o seguro usando o serviço apropriado (supondo que você tenha um serviço chamado secureService)
                const secure = await secureService.createService(req.body);

                if (!secure) {
                    res.status(400).send({ mensagem: "Erro ao cadastrar o seguro!" });
                }

                res.status(201).send({
                    mensagem: "Seguro cadastrado com sucesso!",
                    secure: {
                        id: secure._id,
                        descricao,
                        coberturaDanos,
                        valorCobertura,
                        valorFranquia,
                    }
                });
            } catch (err) {
                res.status(500).send({ mensagem: err.message });
            }
        }
    } catch (err) {
        res.status(500).send({ mensagem: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const seguros = await secureService.findAllService();
        
        if (seguros.length === 0) {
            res.status(404).send({ mensagem: "Nenhum seguro encontrado." });
        } else {
            res.status(200).send({ seguros });
        }
    } catch (err) {
        res.status(500).send({ mensagem: err.message });
    }
}

module.exports = { 
    create,
    findAll
 };