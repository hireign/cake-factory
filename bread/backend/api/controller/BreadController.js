const con = require('../db/sql');
const Bread = con.bread;
const request = require('request');
const Op = con.Sequelize.Op;

const allBreads = () => {
    return new Promise(function(resolve, reject) {

    Bread.findAll({})
    .then(data => {
        resolve(data);
    })
    .catch(err => {
        resolve({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
    }); 
        
    });
}

const createBread=(req)=>{
    return new Promise(function(resolve, reject) {
        const bread = {
            bread_id: req.body.bread_id,
            bread_type: req.body.bread_type,
            bread_qty: req.body.bread_qty
          };
    Bread.create(bread)
    .then(data => {
        resolve(data);
    })
    .catch(err => {
      reject({
        message:
          err.message || "Some error occurred while creating the bread."
      });
    });
    });
}
module.exports.allBreads = allBreads;
module.exports.createBread = createBread;

