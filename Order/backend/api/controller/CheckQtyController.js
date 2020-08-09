const axios = require('axios');

const checkQty = (data) => {
    return new Promise(async function(resolve, reject) {

        const bread = {
            url: 'http://localhost:3002/bread/breadqty',
            body: {
                bread_type: data.bread_type,
                bread_qty_ordered: 5,
            }
        };

        const cream = {
            url: 'http://localhost:4000/getcreamqty',
            body: {
                cream_type: data.cream_type,
                cream_qty_ordered: 1,
            }
        };

        const sugar = {
            url: 'http://localhost:3001/sugarqty',
            body: {
                sugar_type: data.sugar_type,
                sugar_qty_ordered: 1,
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
