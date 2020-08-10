/**
 * Controller for cream related REST API calls
 *
 */
const con = require("../util/database");
const Cream = con.cream;
const { Sequelize } = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;
let transaction;

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
      res.send("fail");
    } else {
      res.status(200);
      res.send(cream);
    }
  } catch (error) {
    next(error);
  }
}

async function getCreamType(req, res, next) {
  try {
    let cream = await Cream.findAll({attributes: ['cream_type']});
    
    creamType = [];

    cream.map((tup) => {
        creamType.push(tup.cream_type)
    })
    res.send(creamType);
  } catch (error) {
    next(error);
  }
}

async function getCreamQty(req, res, next) {

  try {
    let data = await Cream.findOne({attributes: ['qty']},{where: {
      cream_type: req.body.cream_type
    }});

    console.log(req.body.cream_qty_ordered);
    console.log(data.qty);

    if(data.qty >= req.body.cream_qty_ordered){
      res.send({status:true});
    }else{
      res.send({status:false});
    }
  } catch (error) {
    next(error);
  }
}

//this function adds cream using body parameters
async function addCream(req, res, next) {
  try {
    let cream_id_body = req.params.id;
    let cream_type_body = req.params.type;
    let qty_body = req.params.qty;
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
        qty: qty_body,
      }).then((data) => {
        console.log("Cream added: " + data);
      });
      res.status(200);
      res.send("success");
    } else {
      res.send("fail");
    }
  } catch (error) {
    next(error);
  }
}

//this function updates cream quantity using body parameters
async function updateCream(req, res, next) {
  try {
    let cream_id_body = req.params.id;
    let cream_type_body = req.params.type;
    let qty_body = req.params.qty;
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
      res.send("fail");
    } else {
      cream = await Cream.update(
        { qty: qty_body },
        {
          where: {
            cream_id: cream_id_body,
          },
        }
      ).then(() => {
        console.log("Qty updated!");
      });
      res.status(200);
      res.send("success");
    }
  } catch (error) {
    next(error);
  }
}

const reduceCreamQuantity = (req) => {
  return new Promise(function (resolve, reject) {
    Cream.findOne({
      where: { cream_type: req.body.cream_type },
    })
      .then((data) => {
        const difference = data.dataValues.qty - req.body.cream_qty_ordered;
        if (difference < 0) {
          resolve({
            status: false,
            company: "cream",
            result: "Not enough quantity",
          });
        } else {
          Cream.update(
            {
              qty: difference,
            },
            {
              where: {
                cream_type: req.body.cream_type,
              },
            }
          )
            .then((data) => {
              resolve({
                status: true,
                company: "cream",
                result: "Quantity updated",
              });
            })
            .catch((err) => {
              resolve({ status: null, result: err });
            });
        }
      })
      .catch((err) => {
        resolve({ status: null, result: err });
      });
  });
};

const begin=(req)=>{
  return new Promise(async function(resolve, reject) {
      let difference;
      transaction = await con.sequelize.transaction();
      await Cream.findOne({where:{cream_type: req.body.cream_type}})
          .then(data => {
              difference = data.dataValues.qty - req.body.cream_qty_ordered;
          })
          .catch(err => {
              resolve({status:null,result: err});
          })
              await Cream.update({
                  qty: difference
                }, {
                  where: { 
                  cream_type: req.body.cream_type,
                   }, transaction
                })
                  .then(data => {
                  })
                  .catch(err => {
                      resolve({status:null,result: err});
                  });

              if(difference < 0){
                  resolve({status:false, company: 'cream', result: "Not enough quantity"});
              }else{
                  resolve({status:true, company: 'cream', result: "Prepared to commit"});
              }
          
  })
}

const commit=()=>{
  return new Promise(async function(resolve, reject) {
      if(transaction){
          await transaction.commit();
          resolve({status:true});
      }else{
          resolve({status:false});
      }
  })
}

const rollback=()=>{
  return new Promise(async function(resolve, reject) {
      if(transaction){
          await transaction.rollback();
          resolve({status:true});
      }else{
          resolve({status:false});
      }
  })
}


module.exports = {
  getAllCream,
  addCream,
  getCreamByPk,
  updateCream,
  reduceCreamQuantity,
  getCreamType,
  getCreamQty,
  commit,
  rollback,
  begin
};
