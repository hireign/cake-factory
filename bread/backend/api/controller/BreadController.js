const con = require('../db/sql');
const Bread = con.bread;
const Op = con.Sequelize.Op;

const allBreads = () => {
    return new Promise(function(resolve, reject) {
        Bread.findAll({})
            .then(data => {
                resolve({status:true,result:data});
            })
            .catch(err => {
                resolve({status:null,result: err});
            });  
    });
}

const createBread=(req)=>{
    return new Promise(function(resolve, reject) {
        Bread.findOne({where:{bread_id:req.body.bread_id, bread_type: req.body.bread_type}})
            .then(data => {
                console.log(data);
                if(data === null){
                    Bread.create({
                        bread_id: req.body.bread_id,
                        bread_type: req.body.bread_type,
                        bread_qty: req.body.bread_qty
                      })
                        .then(data => {
                            resolve({status:true,result:"Bread added"});
                        })
                        .catch(err => {
                            resolve({status:null,result: err});
                        });
                }else{
                    resolve({status:false,result:"Bread already exists"});
                }
            })
            .catch(err => {
                resolve({status:null,result: err});
            }); 
    });
}

const updateBread=(req)=>{
    return new Promise(function(resolve, reject) {

        Bread.findOne({where:{bread_id:req.body.bread_id, bread_type: req.body.bread_type}})
            .then(data => {
                if(data !== null){
                    Bread.update({
                        bread_qty: req.body.bread_qty
                      }, {
                        where: { 
                            bread_id: req.body.bread_id,
                        bread_type: req.body.bread_type,
                         }
                      })
                        .then(data => {
                            resolve({status:true,result:"Bread updated"});
                        })
                        .catch(err => {
                            resolve({status:null,result: err});
                        });
                }else{
                    resolve({status:false,result:"Bread does not exist"});
                }
            })
            .catch(err => {
                resolve({status:null,result: err});
            });
    });
}

const reduceBreadQuantity=(req)=>{
    return new Promise(function(resolve, reject) {
        Bread.findOne({where:{bread_id:req.body.bread_id, bread_type: req.body.bread_type}})
            .then(data => {
                const difference = data.dataValues.bread_qty - req.body.bread_qty_ordered;
                if(difference < 0){
                    resolve({status:false, company: 'bread', result: "Not enough quantity"});
                }else{
                    Bread.update({
                        bread_qty: difference
                      }, {
                        where: { 
                        bread_id: req.body.bread_id,
                        bread_type: req.body.bread_type,
                         }
                      })
                        .then(data => {
                            resolve({status:true, company: 'bread', result:"Quantity updated"});
                        })
                        .catch(err => {
                            resolve({status:null,result: err});
                        });
                }
            })
            .catch(err => {
                resolve({status:null,result: err});
            })
    });
}
module.exports.allBreads = allBreads;
module.exports.createBread = createBread;
module.exports.updateBread = updateBread;
module.exports.reduceBreadQuantity = reduceBreadQuantity;

