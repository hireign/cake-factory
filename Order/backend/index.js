const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');
const OrderRoute = require('./api/route/OrderRoute');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./api/db/connection");
db.sequelize.sync()
    .then(() => {
        console.log("Synchronizing table");
    })

app.get('/', function (req, res) {
    res.send("Application Working");
});

app.use('/order', OrderRoute);

app.listen(5000, function () {
    console.log("App is running on port 5000");
});

// module.exports.handler = serverless(app);
