const sequelize = require('./infrastructure/config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados realizada com sucesso.');

        await sequelize.sync({ force: true }); // Sincroniza as tabelas no banco
        console.log('Tabelas criadas no banco de dados.');
    } catch (error) {
        console.error('Erro ao conectar ou sincronizar o banco:', error.message);
    } finally {
        await sequelize.close();
    }
})();