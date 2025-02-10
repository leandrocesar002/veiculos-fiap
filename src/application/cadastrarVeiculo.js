const VeiculoModel = require('../infrastructure/database/models/VeiculoModel');

/**
 * Função para cadastrar um veículo no banco de dados.
 * @param {Object} dados - Dados do veículo a ser cadastrado.
 * @param {string} dados.marca - Marca do veículo.
 * @param {string} dados.modelo - Modelo do veículo.
 * @param {number} dados.ano - Ano de fabricação do veículo.
 * @param {string} dados.cor - Cor do veículo.
 * @param {number} dados.preco - Preço do veículo.
 * @returns {Promise<Object>} Veículo cadastrado.
 */
async function cadastrarVeiculo(dados) {
    try {
        const { marca, modelo, ano, cor, preco } = dados;

        // Primeiro, valida se o preço é um número positivo
        if (typeof preco !== 'number' || preco <= 0) {
            throw new Error('O campo "preco" deve ser um número positivo.');
        }

        // Agora valida os outros campos obrigatórios
        if (!marca || !modelo || !ano || !cor || preco == null) {
            throw new Error('Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.');
        }

        if (typeof ano !== 'number' || ano < 1886 || ano > new Date().getFullYear()) {
            throw new Error('O campo "ano" deve ser um número válido.');
        }

        return await VeiculoModel.create(dados);
    } catch (error) {
        console.error('Erro ao cadastrar veículo:', error.message);
        throw error;
    }
}


module.exports = cadastrarVeiculo;
