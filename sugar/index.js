const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


const sql = require('mysql');
const { Console } = require('console');

const con = sql.createConnection({
    host: 'sugar.cfqbli2d5a3v.us-east-1.rds.amazonaws.com',
    user: 'vishvesh',
    password: 'sugar1234',
    port: '3306',
    database: 'sugar'
});

con.connect(function(err) {
    if(err){
        throw err;
    }else{
        console.log("Database connection successful");
    }
});

app.get('/add', function (req, res) {
    res.render("add")
});

app.get('/update', function (req, res) {
    res.render("update")
});



app.get('/', function (req, res) {
    const query = 'SELECT * FROM sugars';
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.render("sugar",{sugars: result});
    });

});

app.post('/createsugars', function (req, res) {
    console.log(req.body,"--------")
    const query = "SELECT * FROM sugars where sugar_type = '" + req.params.type + "' and qty = " + req.body.qty
    console.log(query)
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.length,result)
        if (result.length == 0) {
            const query = "insert into sugars (sugar_type, qty) values ('" + req.body.type + "',"+ req.body.qty + ")"
            con.query(query, (err, result) => {
                if (err) {
                    res.send("Sugar type should be unique")
                }
                const query = 'SELECT * FROM sugars';
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    res.render("sugar",{sugars: result});
                });
            });
        }

    });

});

app.post('/updatesugars', function (req, res) {
    const query = "SELECT * FROM sugars where sugar_type = '" + req.body.type + "' and qty = " + req.body.qty
    console.log(query)
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.length,result)
        if (result.length > 0) {
            const query = "update sugars set qty = " + req.body.update_qty + " where id = " + result[0].id + " and sugar_type = '"
            + req.body.type + "'"

            con.query(query, (err, result) => {
                if (err) {
                    throw err;
                }
                const query = 'SELECT * FROM sugars';
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    res.render("sugar",{sugars: result});
                });
            });
        }
        else{
            res.send("record not exist")
        }

    });

});


app.listen(3000, function () {
    console.log("App is running on port 3000");
});

