const db = require("../db/connection");
const Cake = db.cake;

const getAllCake = () => {
    return new Promise(async function(resolve, reject) {

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
