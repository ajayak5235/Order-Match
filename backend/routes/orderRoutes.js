const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', orderController.placeOrder);
router.get('/pending-orders', orderController.getPendingOrders);
router.get('/completed-orders', orderController.getCompletedOrders);

module.exports = router;
