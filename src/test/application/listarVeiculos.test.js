const listarVeiculos = require("../../application/listarVeiculos");
const VeiculoModel = require("../../infrastructure/database/models/VeiculoModel");
const sinon = require("sinon");

describe("Testes para listarVeiculos", () => {
    afterEach(() => {
        sinon.restore(); // Limpa os mocks após cada teste
    });

    test("Deve retornar uma lista de veículos", async () => {
        const mockVeiculos = [
            { id: 1, marca: "Toyota", modelo: "Corolla", ano: 2022, cor: "Prata", preco: 95000 },
            { id: 2, marca: "Honda", modelo: "Civic", ano: 2021, cor: "Preto", preco: 89000 }
        ];

        sinon.stub(VeiculoModel, "findAll").resolves(mockVeiculos);

        const resultado = await listarVeiculos();

        expect(resultado).toEqual(mockVeiculos);
        expect(VeiculoModel.findAll.calledOnce).toBeTruthy();
    });

    test("Deve retornar uma lista vazia quando não houver veículos cadastrados", async () => {
        sinon.stub(VeiculoModel, "findAll").resolves([]);

        const resultado = await listarVeiculos();

        expect(resultado).toEqual([]);
        expect(VeiculoModel.findAll.calledOnce).toBeTruthy();
    });

    test("Deve lançar um erro se houver falha no banco de dados", async () => {
        sinon.stub(VeiculoModel, "findAll").throws(new Error("Erro de conexão"));

        await expect(listarVeiculos()).rejects.toThrow("Erro ao buscar os veículos no banco de dados.");
    });
});
