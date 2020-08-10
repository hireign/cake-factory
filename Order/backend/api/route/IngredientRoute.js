const express = require('express');
const router = express.Router();
const method = require('../controller/IngredientController');

router.get('/bread', async function (req, res) {
    const data = await method.getBread();
    res.send(data);
});

router.get('/sugar', async function (req, res) {
    const data = await method.getSugar();
    res.send(data);
});

router.get('/cream', async function (req, res) {
    const data = await method.getCream();
    res.send(data);
});

module.exports = router;
