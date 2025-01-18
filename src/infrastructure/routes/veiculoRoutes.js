const express = require('express');
const router = express.Router();
const cadastrarVeiculo = require('../../application/cadastrarVeiculo');
const listarVeiculos = require('../../application/listarVeiculos');
const editarVeiculo = require('../../application/editarVeiculo');

// Rota para cadastrar um veículo (POST /api/veiculos)
router.post('/', async (req, res) => {
    try {
        const veiculo = await cadastrarVeiculo(req.body);
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para listar todos os veículos (GET /api/veiculos)
router.get('/', async (req, res) => {
    try {
        const veiculos = await listarVeiculos();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para editar um veículo (PUT /api/veiculos/:id)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const veiculoAtualizado = await editarVeiculo(id, dadosAtualizados);
        res.status(200).json(veiculoAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
