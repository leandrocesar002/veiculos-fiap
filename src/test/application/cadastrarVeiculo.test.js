

const sinon = require("sinon");
const cadastrarVeiculo = require("../../application/cadastrarVeiculo");
const VeiculoModel = require("../../infrastructure/database/models/VeiculoModel");

describe("Testes para cadastrarVeiculo", () => {
    afterEach(() => {
        sinon.restore(); // Limpa os mocks após cada teste
    });

    test("Deve cadastrar um veículo com sucesso", async () => {
        const mockVeiculo = {
            id: 1,
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2022,
            cor: "Prata",
            preco: 95000,
        };

        sinon.stub(VeiculoModel, "create").resolves(mockVeiculo);

        const resultado = await cadastrarVeiculo(mockVeiculo);

        expect(resultado).toEqual(mockVeiculo);
        expect(VeiculoModel.create.calledOnce).toBeTruthy();
    });

    test("Deve lançar um erro se algum campo obrigatório estiver ausente", async () => {
        await expect(cadastrarVeiculo({ modelo: "Civic", ano: 2022, cor: "Preto", preco: 100000 }))
            .rejects.toThrow('Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.');

        await expect(cadastrarVeiculo({ marca: "Honda", ano: 2022, cor: "Preto", preco: 100000 }))
            .rejects.toThrow('Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.');
    });

    test("Deve lançar um erro se o ano for inválido", async () => {
        await expect(cadastrarVeiculo({ marca: "Honda", modelo: "Civic", ano: 1800, cor: "Preto", preco: 100000 }))
            .rejects.toThrow('O campo "ano" deve ser um número válido.');

        await expect(cadastrarVeiculo({ marca: "Honda", modelo: "Civic", ano: new Date().getFullYear() + 1, cor: "Preto", preco: 100000 }))
            .rejects.toThrow('O campo "ano" deve ser um número válido.');
    });

    test("Deve lançar um erro se o preço for inválido", async () => {
        await expect(cadastrarVeiculo({ marca: "Honda", modelo: "Civic", ano: 2022, cor: "Preto", preco: -50000 }))
            .rejects.toThrow('O campo "preco" deve ser um número positivo.');

        await expect(cadastrarVeiculo({ marca: "Honda", modelo: "Civic", ano: 2022, cor: "Preto", preco: 0 }))
            .rejects.toThrow('O campo "preco" deve ser um número positivo.');
    });

    

});
