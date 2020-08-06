const request = require('request');

const getBread = () => {
    return new Promise(function(resolve, reject) {
        const bread = {
            url: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/allbreads'
        };

        request.get(bread, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
            resolve({status: true, breadType: res.body.result});
        });

    });
}

const getSugar = () => {
    return new Promise(function(resolve, reject) {
        const sugar = {
            url: 'http://localhost:3001/allsugar'
        };
        request.get(sugar, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
            resolve({status: true, breadType: res.body});
        });
    });
}

const getCream = () => {
    return new Promise(function(resolve, reject) {
        const cream = {
            url: 'http://localhost:4000/getallcream'
        };
        request.get(cream, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
            resolve({status: true, breadType: res.body});
        });
    });
}

module.exports.getBread = getBread;
module.exports.getSugar = getSugar;
module.exports.getCream = getCream;
