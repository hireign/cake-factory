const express = require('express');
const router = express.Router();
const method = require('../controller/PaymentController');

router.get('/', async function (req, res) {
    const data = await method.reduceQty(req.query);
    res.send(data);
});

module.exports = router;
