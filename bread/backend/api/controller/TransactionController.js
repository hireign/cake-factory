const con = require('../db/sql');
const Bread = con.bread;

let transaction;


const begin=(req)=>{
    return new Promise(async function(resolve, reject) {
        let difference;
        transaction = await con.sequelize.transaction();
        await Bread.findOne({where:{bread_type: req.body.bread_type}})
            .then(data => {
                difference = data.dataValues.bread_qty - req.body.bread_qty_ordered;
            })
            .catch(err => {
                console.log("1 " + err);
                resolve({status:null,result: err});
            })
                await Bread.update({
                    bread_qty: difference
                  }, {
                    where: { 
                    bread_type: req.body.bread_type,
                     }, transaction
                  })
                    .then(data => {
                        if(difference < 0){
                            resolve({status:false, company: 'bread', result: "Not enough quantity"});
                        }else{
                            resolve({status:true, company: 'bread', result: "Prepared to commit"});
                        }
                    })
                    .catch(err => {
                        console.log("2 " + err);
                        resolve({status:null,result: err});
                    });    
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

module.exports.begin = begin;
module.exports.commit = commit;
module.exports.rollback = rollback;