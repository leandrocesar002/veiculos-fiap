const editarVeiculo = require("../../application/editarVeiculo");
const VeiculoModel = require("../../infrastructure/database/models/VeiculoModel");
const sinon = require("sinon");

describe("Testes para editarVeiculo", () => {
    afterEach(() => {
        sinon.restore(); // Limpa os mocks após cada teste
    });

    test("Deve editar um veículo com sucesso", async () => {
        const mockVeiculo = {
            id: 1,
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2022,
            cor: "Prata",
            preco: 95000,
            update: sinon.stub().resolves()
        };

        const novosDados = { cor: "Vermelho", preco: 98000 };

        sinon.stub(VeiculoModel, "findByPk").resolves(mockVeiculo);

        const resultado = await editarVeiculo(1, novosDados);

        expect(resultado).toEqual(mockVeiculo);
        expect(mockVeiculo.update.calledOnceWith(novosDados)).toBeTruthy();
    });

    test("Deve lançar um erro se o veículo não for encontrado", async () => {
        sinon.stub(VeiculoModel, "findByPk").resolves(null);

        await expect(editarVeiculo(1, { cor: "Preto" })).rejects.toThrow("Veículo não encontrado.");
    });

});
