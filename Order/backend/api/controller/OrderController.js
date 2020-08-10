const db = require("../db/connection");
const Order = db.order;

const getOrder = () => {
    return new Promise(function(resolve, reject) {
        Order.findAll()
            .then(data => {
                resolve({status: true, result: data});
            })
            .catch(err => {
                reject({status: false, result: err});
            });
    });
}

module.exports.getOrder = getOrder;
