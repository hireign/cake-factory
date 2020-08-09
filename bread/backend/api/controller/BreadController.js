const con = require('../db/sql');
const Bread = con.bread;

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

const breadTypes = () => {
    return new Promise(function(resolve, reject) {
        Bread.findAll({attributes: ['bread_type']})
            .then(data => {
                let arr = []
                console.warn(data,"----")
                Object.keys(data).forEach(function(key){
                    var row = data[key]
                    arr.push(row.bread_type)
                    console.warn(row.bread_type)
                });
                resolve(arr);
            })
            .catch(err => {
                resolve({status:null,result: err});
            });  
    });
}

const breadQty = (req) => {
    return new Promise(function(resolve, reject) {
        Bread.findOne({where: {
            bread_type: req.body.bread_type
          }})
            .then(data => {
                if(data.dataValues.bread_qty >= req.body.bread_qty_ordered){
                    resolve({status:true});
                }else{
                    resolve({status:false});
                }
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
        Bread.findOne({where:{bread_type: req.body.bread_type}})
            .then(data => {
                const difference = data.dataValues.bread_qty - req.body.bread_qty_ordered;
                if(difference < 0){
                    resolve({status:false, company: 'bread', result: "Not enough quantity"});
                }else{
                    Bread.update({
                        bread_qty: difference
                      }, {
                        where: { 
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
module.exports.breadTypes = breadTypes;
module.exports.breadQty = breadQty;