const express = require("express");
const bodyParser = require("body-parser");
const connection = require('./db');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

app.post("/passenger/login",function(req,res){
    res.send("I recieved data passenger/login end point");
    console.log(req.body);
});


app.post("/staff/login",function(req,res){
    res.send("I recieved data staff/login end point");
    console.log(req.body);
});


app.post("/pilot/login",function(req,res){
    res.send("I recieved data pilot/login end point");
    console.log(req.body);
});

app.post("/admin/login",function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    console.log(req.body);
    var message = ""
    connection.query('SELECT username FROM admin where username = ?',[username], function(err, result) {
        if (err) throw err;
        else if(result.length == 0){
            message = "user does not exists!";
            res.send(message);
        } else{
            message = "user exists..."
        }
    });
    connection.query('SELECT username FROM admin where username = ? AND password = ?',[username,password], (err, result) => {
        if (err) console.log(err.message);
        else if(result.length == 0){
            message = "Invalid login credentials!";
            res.send(message);
        } else{
            message = "Successful login!"
            res.send(message);
        }
    });
    
});



app.listen(3000, function() {
    console.log('Server listening on port 3000');
});
