const secureService = require('../services/secure.service');

const create = async (req, res) =>{
    try {
        const { policyNumber, startDate, endDate, coverageAmount, deductibleAmount, insuredCar, policyHolder, additionalNotes } = req.body;
    
        // Verifique se todos os campos necessários estão presentes
        if (!policyNumber || !startDate || !endDate || !coverageAmount || !deductibleAmount || !insuredCar || !policyHolder || !policyHolder.name || !policyHolder.email) {
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
                        policyNumber,
                        startDate,
                        endDate,
                        coverageAmount,
                        deductibleAmount,
                        insuredCar,
                        policyHolder: {
                            name: policyHolder.name,
                            email: policyHolder.email,
                        },
                        additionalNotes,
                    }
                });
            } catch (err) {
                res.status(500).send({ mensagem: err.message });
            }
        }
    } catch (err) {
        res.status(500).send({ mensagem: err.message });
    }
}    

module.exports = { create };