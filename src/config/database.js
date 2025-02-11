const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres_fiap', 'username', 'password', {
    host: 'my-db-fiap.czmuka4aqktq.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    logging: false, 
});

module.exports = sequelize;