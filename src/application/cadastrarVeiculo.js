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

        if (!marca || !modelo || !ano || !cor || !preco) {
            throw new Error('Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.');
        }

        if (typeof ano !== 'number' || ano < 1886 || ano > new Date().getFullYear()) {
            throw new Error('O campo "ano" deve ser um número válido.');
        }

        if (typeof preco !== 'number' || preco <= 0) {
            throw new Error('O campo "preco" deve ser um número positivo.');
        }

        // Cria o veículo no banco de dados
        const veiculo = await VeiculoModel.create(dados);
        return veiculo;
    } catch (error) {
        console.error('Erro ao cadastrar veículo:', error.message);
        throw new Error('Não foi possível cadastrar o veículo. Verifique os dados enviados.');
    }
}

module.exports = cadastrarVeiculo;
