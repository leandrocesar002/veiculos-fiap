const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const VeiculoModel = sequelize.define('Veiculo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'disponível',
    },
}, {
    tableName: 'veiculos',
    timestamps: false, // Não adiciona campos createdAt e updatedAt
});

module.exports = VeiculoModel;
