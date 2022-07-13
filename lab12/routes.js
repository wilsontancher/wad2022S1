var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');

db.connect();

    var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));

    router.use(function(req,res,next){
        //if it is api request, then check for valid token
        if(req.url.includes("/api")) {
            //first time use req.query
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided");
            } else {
                db.checkToken(token, function (err, user) {
                    if (err || user == null) {
                        res.status(401).send("Invalid token provided");
                    } else {
                        //means proceed on with the request.
                        next();
                    }
                });
            }
        } else {
            //means proceed on with the request.
            next();
        }
    })

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/login', function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });

    router.post('/login', function (req, res) {
        var data = req.body;
        db.login(data.username, data.password, function (err, user) {
            if (err) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                if (user == null) {
                    res.status(401).send("Login unsucessful. Please try again later");
                } else {
                    var strToHash = user.username + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    db.updateToken(user._id, token, function (err, user) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token });
                    });
                }
            }
        })
    })

    router.get("/logout", function (req, res) {
        //first time use req.query
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.removeToken(user._id, function (err, user) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }
    })

    //for api calls
    router.post("/api/items", function (req, res) {
        //simulate add item to db
        res.status(200).send("Item added successfully.");
    })

    router.get("/api/items",function(req,res) {
        //simulate retrieve items from db
        res.status(200).send([
            {
                "name":"item1",
                "price":"$1"
            },
            {
                "name":"item2",
                "price":"$2"
            }
        ])
    })



module.exports = router;
