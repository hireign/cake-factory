const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');
const JobRoute = require('./api/route/BreadRoute');
const OrderRoute = require('./api/route/OrderRoute');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Application Working");
});

app.use('/bread', JobRoute);
app.use('/order', OrderRoute);

const db = require("./api/db/sql");
db.sequelize.sync().then(() => {
    console.log("sync");
  });

app.listen(3000, function () {
    console.log("App is running on port 3000");
});

//module.exports.handler = serverless(app);
