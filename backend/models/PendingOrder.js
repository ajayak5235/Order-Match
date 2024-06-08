const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const PendingOrder = sequelize.define('pendingOrder', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    buyerQty: Sequelize.INTEGER,
    buyerPrice: Sequelize.FLOAT,
    sellerPrice: Sequelize.FLOAT,
    sellerQty: Sequelize.INTEGER
});

module.exports = PendingOrder;
