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
    const query = "SELECT * FROM sugars where sugar_type = '" + req.params.type + "' and qty = " + req.body.qty
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
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
    const query = "SELECT * FROM sugars where sugar_type = '" + req.body.type + "'";
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
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


app.get('/sugartypes', function (req, res) {
    const query = "SELECT sugar_type FROM sugars"
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        let arr = []
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            arr.push(row.sugar_type)  
        });
        res.send(arr)
    });
});

app.get('/sugarqty', function (req, res) {

    const query = "SELECT qty FROM sugars where sugar_type='"+req.body.sugar_type+"'";
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }

        if(result[0].qty >= req.body.sugar_qty_ordered){
            res.send({status:true});
        }else{
            res.send({status:false});
        }
    });
});

app.get('/begin', function(req,res){
	let difference;
    var query1 = `SELECT * FROM sugars WHERE sugar_type = "${req.body.sugar_type}" `;

    con.query(query1,(err,result)=>{
    	if(err) throw err
        if(result.length > 0){
        	difference = result[0].qty - req.body.sugar_qty_ordered;
            var query1 = `START TRANSACTION`;
			var query2 = `UPDATE sugars SET qty = ${difference} WHERE sugar_type = "${req.body.sugar_type}"`;
			con.query(query1, (err,response) => {
				if(err) throw err
		        else{
		        	con.query(query2,(err,response)=>{
			            if(err) throw err
			            else{
                            if (difference > 0){
                                res.send({status:true});
                            }
                            else
                            {
                                res.send({status:true, company: 'bread', result: "Prepared to commit"})
                            }
			             }
			        })
		        }
    		})
        }else{
        	res.json({status:false, company: 'sugar', result:"Item not available"});
        }
    })
	
});

app.get('/commit',function(req,res){
	var query1 = `COMMIT`;
	con.query(query1,(err,response)=>{
        if(err) throw err
        else{
            res.send({status:true});
        }
    })
});

app.get('/rollback',function(req,res){
	var query1 = `ROLLBACK`;
	con.query(query1,(err,response)=>{
        if(err) throw err
        else{
            res.send({status:true});
        }
    })
});

app.listen(3001, function () {
    console.log("App is running on port 3001");
});

