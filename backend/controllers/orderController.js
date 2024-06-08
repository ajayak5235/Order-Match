const OrderService = require('../services/orderService');

exports.placeOrder = async (req, res, next) => {
    try {
        const { qty, price } = req.body;
        await OrderService.placeOrder(qty, price);
        res.status(201).send('Order placed successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getPendingOrders = async (req, res, next) => {
    try {
        const pendingOrders = await OrderService.getPendingOrders();
        res.status(200).json(pendingOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCompletedOrders = async (req, res, next) => {
    try {
        const completedOrders = await OrderService.getCompletedOrders();
        res.status(200).json(completedOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
