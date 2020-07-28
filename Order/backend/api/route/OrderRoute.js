const express = require('express');
const router = express.Router();
const method = require('../controller/OrderController');


router.get('/placeOrders', async function (req, res) {
    const data = await method.placeOrders();
    res.send(data);
});

module.exports = router;
