const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const CompletedOrder = sequelize.define('completedOrder', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    price: Sequelize.FLOAT,
    qty: Sequelize.INTEGER
});

module.exports = CompletedOrder;
