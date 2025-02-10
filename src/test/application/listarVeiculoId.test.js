const listarVeiculoId = require("../../application/listarVeiculoId");
const Veiculo = require("../../infrastructure/database/models/VeiculoModel");
const sinon = require("sinon");

describe("Testes para listarVeiculoId", () => {
    afterEach(() => {
        sinon.restore(); // Limpa os mocks após cada teste
    });

    test("Deve retornar um veículo existente", async () => {
        const mockVeiculo = {
            id: 1,
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2022,
            cor: "Prata",
            preco: 95000
        };

        sinon.stub(Veiculo, "findByPk").resolves(mockVeiculo);

        const resultado = await listarVeiculoId(1);

        expect(resultado).toEqual(mockVeiculo);
        expect(Veiculo.findByPk.calledOnceWith(1)).toBeTruthy();
    });

    test("Deve retornar null se o veículo não for encontrado", async () => {
        sinon.stub(Veiculo, "findByPk").resolves(null);

        const resultado = await listarVeiculoId(999);

        expect(resultado).toBeNull();
        expect(Veiculo.findByPk.calledOnceWith(999)).toBeTruthy();
    });

    test("Deve lançar um erro se houver falha no banco de dados", async () => {
        sinon.stub(Veiculo, "findByPk").throws(new Error("Erro de conexão"));

        await expect(listarVeiculoId(1)).rejects.toThrow("Erro ao buscar veículo: Erro de conexão");
    });
});
