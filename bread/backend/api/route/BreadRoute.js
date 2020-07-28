const express = require('express');
const router = express.Router();
const method = require('../controller/BreadController');

router.get('/allbreads', async function (req, res) {
    const data = await method.allBreads();
    res.send(data);
});

router.post('/addbread', async function (req,res){
    const data = await method.createBread(req);
    res.send(data);
})

module.exports = router;
