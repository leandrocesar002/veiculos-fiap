const VeiculoModel = require('../infrastructure/database/models/VeiculoModel');

async function listarVeiculos() {
    try {
        return await VeiculoModel.findAll();
    } catch (error) {
        console.error('Erro ao listar veículos:', error.message);
        throw new Error('Erro ao buscar os veículos no banco de dados.');
    }
}

module.exports = listarVeiculos;