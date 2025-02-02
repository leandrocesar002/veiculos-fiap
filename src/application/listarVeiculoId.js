const Veiculo = require("../infrastructure/database/models/VeiculoModel");

const listarVeiculoId = async (id) => {
    try {
        const veiculo = await Veiculo.findByPk(id); 
        return veiculo;
    } catch (error) {
        throw new Error(`Erro ao buscar veículo: ${error.message}`);
    }
};

module.exports = listarVeiculoId;
