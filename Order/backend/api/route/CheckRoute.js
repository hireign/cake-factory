const express = require('express');
const router = express.Router();
const method = require('../controller/CheckQtyController');

router.get('/quantity', async function (req, res) {
    const data = await method.checkQty(req.body);
    res.send(data);
});

module.exports = router;
