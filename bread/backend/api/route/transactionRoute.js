const express = require('express');
const router = express.Router();
const method = require('../controller/TransactionController');

router.get('/begin', async function (req, res) {
    const data = await method.begin(req);
    res.send(data);
});

router.get('/commit', async function (req, res) {
    const data = await method.commit();
    res.send(data);
});

router.get('/rollback', async function (req, res) {
    const data = await method.rollback();
    res.send(data);
});

module.exports = router;
