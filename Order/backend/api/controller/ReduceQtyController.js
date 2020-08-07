const request = require('request');
const db = require("../db/connection");
const Order = db.order;

const reduceQty = async(data) => {
    return new Promise(function(resolve, reject) {

        const bread = {
            url: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/reducebreadquantity',
            json: true,
            body: {
                bread_id: data.bread_id,
                bread_type: data.bread_type,
                bread_qty_ordered: data.bread_qty_ordered,
            }
        };

        let breadStatus;

        request.put(bread, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            breadStatus = res.body.status;
        });

        const sugar = {
            url: 'http://localhost:3001/changeQuantity',
            json: true,
            body: {
                sugar_id: data.sugar_id,
                sugar_type: data.sugar_type,
                sugar_qty_ordered: data.sugar_qty_ordered,
            }
        };

        let sugarStatus;

        request.put(sugar, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
            sugarStatus = res.body.status;
        });

        const cream = {
            url: 'http://localhost:3000/cream/reducecreamquantity',
            json: true,
            body: {
                cream_id: data.cream_id,
                cream_type: data.cream_type,
                cream_qty_ordered: data.cream_qty_ordered,
            }
        };

        let creamStatus;

        // request.put(cream, (err, res, body) => {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     creamStatus = res.body.status;
        // });
        console.log(breadStatus + "  " + sugarStatus);
        if(breadStatus && sugarStatus /*&& creamStatus*/){
            Order.create(data)
                .then(data => {
                    resolve({status: true, result: "Order placed successfully!!"});
                })
                .catch(err => {
                    reject({status: false, result: err});
                });
        }else{

        }
    });
}

module.exports.reduceQty = reduceQty;
