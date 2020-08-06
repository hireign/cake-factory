/**
 * Routes for cream related REST API calls
 *
 */
const express = require("express");
const creamController = require("../controllers/creamController");
const router = express.Router();

//returns all the cream products from the database
router.get("/getallcream", creamController.getAllCream);

module.exports = router;
