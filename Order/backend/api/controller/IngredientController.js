const request = require('request');

const getBread = () => {
    return new Promise(function(resolve, reject) {
        const bread = {
            url: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/breadtypes'
        };

        request.get(bread, (err, res, body) => {
            if (err) {
                return console.log(err);
            }

            const type = JSON.parse(res.body);
            resolve({status: true, breadType: type});
        });
    });
}

const getSugar = () => {
    return new Promise(function(resolve, reject) {
        const sugar = {
            url: 'http://129.173.67.214:3001/sugartypes'
        };
        request.get(sugar, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            const type = JSON.parse(res.body);
            resolve({status: true, sugarType: type});
        });
    });
}

const getCream = () => {
    return new Promise(function(resolve, reject) {
        const cream = {
            url: 'http://129.173.67.214:4000/getcreamtype'
        };
        request.get(cream, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            const type = JSON.parse(res.body);
            resolve({status: true, creamType: type});
        });
    });
}

module.exports.getBread = getBread;
module.exports.getSugar = getSugar;
module.exports.getCream = getCream;
