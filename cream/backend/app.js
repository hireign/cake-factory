const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const Sequelize = require('sequelize');

//route file definitions
const creamRoute = require('./routes/creamRoute');

//a middleware to process requests
app.use(express.json());

//attempting to connect
const db = require("./util/database");
db.sequelize.sync().then(() => {
    console.log("Database connected");
  });

//creating a server on port 3000
const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening to Port ${port}`);
});

//all the route files to be used in the application
app.use(creamRoute);

module.exports = app;