const express = require('express');
const router = express.Router();
const method = require('../controller/CakeController');

router.get('/getallcake', async function (req, res) {
    const data = await method.getAllCake();
    res.send(data);
});

module.exports = router;
