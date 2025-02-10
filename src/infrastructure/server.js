const express = require('express');
const sequelize = require('../config/database'); 


const app = express();

app.use(express.json()); 

app.use('/api/veiculos', require('./routes/veiculoRoutes'));

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados realizada com sucesso.');

        await sequelize.sync();
        console.log('Tabelas sincronizadas.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error.message);
        process.exit(1); 
    }
};

startServer();