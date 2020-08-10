const axios = require('axios');

const checkQty = (data) => {
    return new Promise(async function(resolve, reject) {

        const bread = {
            url: 'https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/breadqty',
            body: {
                bread_type: data.bread_type,
                bread_qty_ordered: data.bread_qty_ordered,
            }
        };

        const cream = {
            url: 'http://129.173.67.214:4000/getcreamqty',
            body: {
                cream_type: data.cream_type,
                cream_qty_ordered: data.cream_qty_ordered,
            }
        };

        const sugar = {
            url: 'http://129.173.67.214:3001/sugarqty',
            body: {
                sugar_type: data.sugar_type,
                sugar_qty_ordered: data.sugar_qty_ordered,
            }
        };

        const breadResponse = await axios.get(bread.url, { data: bread.body});
        const breadStatus = breadResponse.data.status;
        console.log(breadStatus);

        const creamResponse = await axios.get(cream.url, { data: cream.body});
        const creamStatus = creamResponse.data.status;
        console.log(creamStatus);

        const sugarResponse = await axios.get(sugar.url, { data: sugar.body});
        const sugarStatus = sugarResponse.data.status;
        console.log(sugarStatus);

        if(breadStatus && creamStatus && sugarStatus){
            console.log("In Stock");
            resolve({status: true, result: "In Stock"});
        }else{
            console.log("Out of Stock");
            resolve({status: false, result: "Out of Stock"});
        }
    });
}

module.exports.checkQty = checkQty;
