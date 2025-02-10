class Veiculo {
    constructor(id, marca, modelo, ano, cor, preco, status = 'disponível') {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.preco = preco;
        this.status = status;
    }
}

module.exports = Veiculo;