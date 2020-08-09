const db = require("../db/connection");
const axios = require('axios');
const Order = db.order;

const reduceQty = (data) => {
    return new Promise(async function(resolve, reject) {

        const bread = {
            url: 'http://localhost:3002/bread/reducebreadquantity',
            body: {
                bread_id: data.bread_id,
                bread_type: data.bread_type,
                bread_qty_ordered: data.bread_qty_ordered,
            }
        };

        const cream = {
            url: 'http://localhost:4000/reducecream',
            body: {
                cream_id: data.cream_id,
                cream_type: data.cream_type,
                cream_qty_ordered: data.cream_qty_ordered,
            }
        };

        const sugar = {
            url: 'http://localhost:3001/changeQuantity',
            body: {
                sugar_id: data.sugar_id,
                sugar_type: data.sugar_type,
                sugar_qty_ordered: data.sugar_qty_ordered,
            }
        };

        const breadResponse = await axios.put(bread.url, bread.body);
        const breadStatus = breadResponse.data.status;

        const creamResponse = await axios.put(cream.url, cream.body);
        const creamStatus = creamResponse.data.status;

        const sugarResponse = await axios.put(sugar.url, sugar.body);
        const sugarStatus = sugarResponse.data.status;

        if(breadStatus && creamStatus && sugarStatus){
            Order.create(data)
                .then(data => {
                    resolve({status: true, result: "Order placed successfully!!"});
                })
                .catch(err => {
                    reject({status: null, result: err});
                });
        }else{
            resolve({status: false, result: "Order unsuccessfully!!"});
        }
    });
}

module.exports.reduceQty = reduceQty;
