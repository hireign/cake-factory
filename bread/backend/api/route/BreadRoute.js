const express = require('express');
const router = express.Router();
const method = require('../controller/BreadController');

router.get('/allbreads', async function (req, res) {
    const data = await method.allBreads();
    res.send(data);
});

router.get('/breadqty', async function (req, res) {
    const data = await method.breadQty(req);
    res.send(data);
});

router.post('/addbread', async function (req,res){
    const data = await method.createBread(req);
    res.send(data);
});

router.get('/breadtypes', async function (req, res) {
    const data = await method.breadTypes();
    res.send(data);
});

router.put('/updatebread', async function (req,res){
    const data = await method.updateBread(req);
    res.send(data);
})

router.put('/reducebreadquantity', async function (req,res){
    const data = await method.reduceBreadQuantity(req);
    res.send(data);
})

module.exports = router;
