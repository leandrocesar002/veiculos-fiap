const VeiculoModel = require('../infrastructure/database/models/VeiculoModel');

async function editarVeiculo(id, dadosAtualizados) {
    const veiculo = await VeiculoModel.findByPk(id);
    if (!veiculo) {
        throw new Error('Veículo não encontrado.');
    }

    try {
        await veiculo.update(dadosAtualizados);
        return veiculo;
    } catch (error) {
        console.error('Erro ao editar veículo:', error.message);
        throw new Error('Erro ao atualizar os dados do veículo.');
    }
}

module.exports = editarVeiculo;
