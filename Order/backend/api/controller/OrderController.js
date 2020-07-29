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

const postOrder = (data) => {
    return new Promise(function(resolve, reject) {
        Order.create(data)
            .then(data => {
                resolve({status: true, result: "Order placed successfully!!"});
            })
            .catch(err => {
                reject({status: false, result: err});
            });
    });
}

module.exports.getOrder = getOrder;
module.exports.postOrder = postOrder;
