const db = require("../db/connection");
const axios = require('axios');
const Order = db.order;

const reduceQty = (data) => {
    return new Promise(async function(resolve, reject) {

        const bread = {
            urlBegin: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/transaction/begin',
            urlCommit: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/transaction/commit',
            urlRollBack: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/transaction/rollback',
            body: {
                bread_type: data.bread_type,
                bread_qty_ordered: data.bread_qty_ordered,
            }
        };

        const cream = {
            urlBegin: 'http://129.173.67.214:4000/begin',
            urlCommit: 'http://129.173.67.214:4000/commit',
            urlRollBack: 'http://129.173.67.214:4000/rollback',
            body: {
                cream_type: data.cream_type,
                cream_qty_ordered: data.cream_qty_ordered,
            }
        };

        const sugar = {
            urlBegin: 'http://129.173.67.214:3001/begin',
            urlCommit: 'http://129.173.67.214:3001/commit',
            urlRollBack: 'http://129.173.67.214:3001/rollback',
            body: {
                sugar_type: data.sugar_type,
                sugar_qty_ordered: data.sugar_qty_ordered,
            }
        };

        const breadResponse = await axios.get(bread.urlBegin, { data: bread.body});
        const breadStatus = breadResponse.data.status;

        console.log(breadStatus);


        const creamResponse = await axios.get(cream.urlBegin, { data: cream.body});
        const creamStatus = creamResponse.data.status;

        console.log(creamStatus);


        const sugarResponse = await axios.get(sugar.urlBegin, { data: sugar.body});
        const sugarStatus = sugarResponse.data.status;

        console.log(sugarStatus);

        if(breadStatus && creamStatus && sugarStatus){
            await axios.get(bread.urlCommit)
            console.log("1");
            await axios.get(cream.urlCommit);
            console.log("2");
            await axios.get(sugar.urlCommit);
            console.log("3");

            console.log("Done");

            Order.create(data)
                .then(data => {
                    resolve({status: true, result: "Order placed successfully!!"});
                })
                .catch(err => {
                    reject({status: null, result: err});
                });


        }else{
            await axios.get(bread.urlRollBack);
            await axios.get(cream.urlRollBack);
            await axios.get(sugar.urlRollBack);
            console.log("Not Done")
            resolve({status: false, result: "Order unsuccessfully!!"});
        }
    });
}

module.exports.reduceQty = reduceQty;
