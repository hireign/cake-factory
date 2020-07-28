const con = require('../db/sql');

const placeOrders = () => {
    return new Promise(function(resolve, reject) {
        resolve({status: true, message: "Working"});
    });
}

module.exports.placeOrders = placeOrders;
