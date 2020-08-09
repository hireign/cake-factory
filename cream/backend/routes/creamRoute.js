/**
 * Routes for cream related REST API calls
 *
 */
const express = require("express");
const router = express.Router();
const creamController = require("../controllers/creamController");

router.get("/getcreamqty", creamController.getCreamQty);
router.get("/getcreamtype", creamController.getCreamType);
//returns all the cream products from the database
router.get("/getallcream", creamController.getAllCream);
//returns a cream by its cream_id
router.get("/getcreambypk", creamController.getCreamByPk);
//allows to add cream products to the database
router.post("/addcream/:id/:type/:qty", creamController.addCream);
//to update qty of cream by its pk
router.put("/updatecream/:id/:type/:qty", creamController.updateCream);
//to reduce qty of cream
router.put('/reducecream', async function (req,res){
    const data = await creamController.reduceCreamQuantity(req);
    res.send(data);
})


router.get('/begin', async function (req, res) {
    const data = await creamController.begin(req);
    res.send(data);
});

router.get('/commit', async function (req, res) {
    const data = await creamController.commit();
    res.send(data);
});

router.get('/rollback', async function (req, res) {
    const data = await creamController.rollback();
    res.send(data);
});

module.exports = router;
