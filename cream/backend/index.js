const express = require('express');
const app = express();
const Sequelize = require('sequelize');
var cors = require('cors')

//route file definitions
const creamRoute = require('./routes/creamRoute');

//middleware to process requests
app.use(express.json());
app.use(cors())

//all the route files to be used in the application
// app.use(creamRoute);
app.use('/', creamRoute);


//attempting to connect
const db = require("./util/database");
db.sequelize.sync().then(() => {
    console.log("Database connected");
  });

//creating a server on port 4000
const port = 4000;
app.listen(port, ()=>{
    console.log(`Listening to Port ${port}`);
});

module.exports = app;