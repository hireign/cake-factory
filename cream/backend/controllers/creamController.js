/**
 * Controller for cream related REST API calls
 *
 */
const con = require("../util/database");
const Cream = con.cream;
const { Sequelize } = require("sequelize");

async function getAllCream(req, res, next) {
  try {
    let cream = await Cream.findAll();
    res.send(cream);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCream,
};
