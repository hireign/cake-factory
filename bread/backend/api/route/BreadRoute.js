const express = require('express');
const router = express.Router();
const method = require('../controller/BreadController');

router.get('/allbreads', async function (req, res) {
    const data = await method.allJobs();
    res.send(data);
});


module.exports = router;
