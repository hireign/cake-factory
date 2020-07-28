const db = require("../db/connection");
const Cake = db.cake;
const Op = db.Sequelize.Op;

const getAllCake = () => {
    return new Promise(function(resolve, reject) {
        Cake.findAll()
            .then(data => {
                resolve({status: true, data: data});
            })
            .catch(err => {
                reject({status: false, data: err});
            });
    });
}

module.exports.getAllCake = getAllCake;
