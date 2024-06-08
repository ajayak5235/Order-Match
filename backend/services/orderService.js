const CompletedOrder = require('../models/CompleteOrder');
const PendingOrder = require('../models/PendingOrder');
const { Sequelize } = require('sequelize');
const sequelize = require('../utility/database');


exports.placeOrder = async (qty, price) => {
    const t = await sequelize.transaction();

    try {
        
        const matchingOrders = await PendingOrder.findAll({
            where: {
                buyerPrice: { [Sequelize.Op.lte]: price },
                sellerPrice: { [Sequelize.Op.lte]: price }
            },
            order: [['sellerPrice', 'ASC']],
            transaction: t
        });

        if (matchingOrders.length > 0) {
            const match = matchingOrders[0];
            const completedQty = Math.min(qty, match.sellerQty);

            await CompletedOrder.create({
                price: match.sellerPrice,
                qty: completedQty
            }, { transaction: t });

            if (match.sellerQty > completedQty) {
                await match.update({ sellerQty: match.sellerQty - completedQty }, { transaction: t });
            } else {
                await match.destroy({ transaction: t });
            }
        } else {
            await PendingOrder.create({
                buyerQty: qty,
                buyerPrice: price,
                sellerPrice: price + 1, // Assuming seller price is always higher
                sellerQty: qty
            }, { transaction: t });
        }

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

exports.getPendingOrders = async () => {
    return PendingOrder.findAll();
};

exports.getCompletedOrders = async () => {
    return CompletedOrder.findAll();
};
