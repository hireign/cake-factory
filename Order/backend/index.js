const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');
const CakeRoute = require('./api/route/CakeRoute');
const OrderRoute = require('./api/route/OrderRoute');
const ReduceQtyRoute = require('./api/route/ReduceQtyRoute');
const IngredientRoute = require('./api/route/IngredientRoute')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./api/db/connection");
db.sequelize.sync()
    .then(() => {
        console.log("Tables Synchronized");
    })

app.get('/', function (req, res) {
    res.send("Application Working");
});

app.use('/cake', CakeRoute);
app.use('/order', OrderRoute);
app.use('/reduce', ReduceQtyRoute);
app.use('/ingredient', IngredientRoute);

app.listen(5000, function () {
    console.log("App is running on port 5000");
});

// module.exports.handler = serverless(app);
