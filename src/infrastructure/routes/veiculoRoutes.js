const express = require('express');
const router = express.Router();
const cadastrarVeiculo = require('../../application/cadastrarVeiculo');
const listarVeiculos = require('../../application/listarVeiculos');
const editarVeiculo = require('../../application/editarVeiculo');
const listarVeiculoId = require('../../application/listarVeiculoId');
const VeiculoModel = require('../database/models/VeiculoModel');

router.post('/', async (req, res) => {
    try {
        const veiculo = await cadastrarVeiculo(req.body);
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/listarVeiculosVendidos", async (req, res) => {
    try {
        let { status, order } = req.query;

        if (!["disponível", "VENDIDO"].includes(status)) {
            return res.status(400).json({ message: 'Status inválido. Use "disponível" ou "VENDIDO".' });
        }

        if (!["ASC", "DESC"].includes(order)) {
            return res.status(400).json({ message: 'Ordem inválida. Use "ASC" para crescente ou "DESC" para decrescente.' });
        }

        const veiculos = await VeiculoModel.findAll({
            where: { status },
            order: [["preco", order]] 
        });

        return res.status(200).json(veiculos);
    } catch (error) {
        console.error("❌ Erro ao listar veículos:", error.message);
        return res.status(500).json({ message: "Erro ao buscar veículos no banco de dados." });
    }
});

router.get('/', async (req, res) => {
    try {
        const veiculos = await listarVeiculos();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const veiculo = await listarVeiculoId(id);

        if (!veiculo) {
            return res.status(404).json({ message: "Veículo não encontrado" });
        }

        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
