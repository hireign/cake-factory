const con = require('../db/sql');
const request = require('request');

const allBreads = () => {
    return new Promise(function(resolve, reject) {
        
            resolve({status: true, message: "All breads"});
        
    });
}


module.exports.allJobs = allBreads;

