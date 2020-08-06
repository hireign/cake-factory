/**
 * Routes for cream related REST API calls
 *
 */
const express = require("express");
const creamController = require("../controllers/creamController");
const router = express.Router();

//returns all the cream products from the database
router.get("/getallcream", creamController.getAllCream);
//returns a cream by its cream_id
router.get("/getcreambypk", creamController.getCreamByPk);
//allows to add cream products to the database
router.post("/addcream", creamController.addCream);
//to update qty of cream by its pk
router.put("/updatecream", creamController.updateCream);

module.exports = router;
