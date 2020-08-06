/**
 * Controller for cream related REST API calls
 *
 */
const con = require("../util/database");
const Cream = con.cream;
const { Sequelize } = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;

//this function returns all creams from the database
async function getAllCream(req, res, next) {
  try {
    let cream = await Cream.findAll();
    res.send(cream);
  } catch (error) {
    next(error);
  }
}

//this function returns a cream by pk cream_id through body
async function getCreamByPk(req, res, next) {
  try {
    let cream_id_body = req.body.cream_id;
    let cream = await Cream.findByPk(cream_id_body);
    if (cream === null) {      
      res.status(404)
      res.send("fail")
    }
    else{      
      res.status(200)
      res.send(cream);
    }
  } catch (error) {
    next(error);
  }
}

//this function adds cream using body parameters
async function addCream(req, res, next) {
  try {
    let cream_id_body = req.body.cream_id;
    let cream_type_body = req.body.cream_type;
    let qty_body = req.body.qty;

    let cream = await Cream.findOne({
      where: {
        [Op.or]: [
          {
            cream_id: cream_id_body,
          },
          {
            cream_type: cream_type_body,
          },
        ],
      },
    });
    if (cream === null) {
      cream = await Cream.create({
        cream_id: cream_id_body,
        cream_type: cream_type_body,
        qty: qty_body
      }).then(data => {
        console.log("Cream added: " + data);
      });
      res.status(200)
      res.send("success");
    }
    else{
      res.status(404)
      res.send("fail")
    }
  } catch (error) {
    next(error);
  }
}

//this function updates cream quantity using body parameters
async function updateCream(req, res, next) {
  try {
    let cream_id_body = req.body.cream_id;
    let cream_type_body = req.body.cream_type;
    let qty_body = req.body.qty;
    let cream = await Cream.findOne({
      where: {
        [Op.and]: [
          {
            cream_id: cream_id_body,
          },
          {
            cream_type: cream_type_body,
          },
        ],
      },
    });
    if (cream === null) {
      res.status(404)
      res.send("fail")
    }
    else{
      cream = await Cream.update({ qty: qty_body }, {
        where: {
          cream_id: cream_id_body
        }
      }).then(() => {
        console.log("Qty updated!");
      });
      res.status(200)
      res.send("success");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCream,
  addCream,
  getCreamByPk,
  updateCream
};