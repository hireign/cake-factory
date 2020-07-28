const db = require("../db/connection");
const Order = db.order;
const Op = db.Sequelize.Op;

const getOrder = () => {
    return new Promise(function(resolve, reject) {
        Order.findAll()
            .then(data => {
                resolve({status: true, data: data});
            })
            .catch(err => {
                reject({status: false, data: err});
            });
    });
}

const postOrder = () => {
    return new Promise(function(resolve, reject) {
        Order.create()
            .then(data => {
                resolve({status: true, data: data});
            })
            .catch(err => {
                reject({status: false, data: err});
            });
    });
}

module.exports.getOrder = getOrder;
module.exports.postOrder = postOrder;
