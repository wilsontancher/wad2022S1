var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');

db.connect();


    var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));

    router.use(function(req,res,next){
        //only check for token if it is PUT, DELETE methods or it is POSTING to events
        if(req.method=="PUT" || req.method=="DELETE"
            || (req.method=="POST" && req.url.includes("/events"))) {
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
            } else {
                db.checkToken(token, function (err, organizer) {
                    if (err || organizer == null) {
                        res.status(401).send("[Invalid token] You are not allowed to perform this action.");
                    } else {
                        //means proceed on with the request.
                        next();
                    }
                });
            }
        } else {    //all other routes will pass
            next();
        }
    });

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/edit', function (req, res) {
        res.sendFile(__dirname + "/views/editEvent.html");
    });
    router.get('/register', function (req, res) {
        res.sendFile(__dirname + "/views/register.html");
    });
    router.get('/login', function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    router.get('/events', function (req, res) {
        db.getAllEvents(function (err, events) {
            if (err) {
                res.status(500).send("Unable to get all events.");
            } else {
                res.status(200).send(events);
            }
        })
    })
    router.get('/events/:id', function (req, res) {
        var id = req.params.id;
        db.getEvent(id, function (err, event) {
            if (err) {
                res.status(500).send("Unable to find an event with this id");
            } else {
                res.status(200).send(event);
            }
        })
    })
    router.post('/events', function (req, res) {
        var data = req.body;
        db.addEvent(data.name, data.description, data.startDate, data.startTime, data.endDate, data.endTime,
            function (err, event) {
                if (err) {
                    res.status(500).send("Unable to add a new event");
                } else {
                    res.status(200).send("Event has been successfully added!");
                }
            })
    });

    router.put('/events', function (req, res) {
        var data = req.body;
        db.updateEvent(data.id, data.name, data.description, data.startDate, data.startTime, data.endDate, data.endTime,
            function (err, event) {
                if (err) {
                    res.status(500).send("Unable to update the event");
                } else {
                    if (event == null) {
                        res.status(200).send("No event is updated");
                    } else {
                        res.status(200).send("Event has been updated successfully");
                    }
                }
            });
    })

    router.delete('/events/:id', function (req, res) {
        var id = req.params.id;
        db.deleteEvent(id, function (err, event) {
            if (err) {
                res.status(500).send("Unable to delete the event");
            } else {
                if (event == null) {
                    res.status(200).send("No event is deleted");
                } else {
                    res.status(200).send("Event has been deleted successfully");
                }
            }
        });
    })

    router.post('/register', function (req, res) {
        var data = req.body;
        db.addOrganizer(data.name,data.username, data.password, data.company, function (err, organizer) {
            if (err) {
                res.status(500).send("Unable to register a new organizer");
            } else {
                res.status(200).send("Organizer has been registered!");
            }
        })
    })

    router.post('/login', function (req, res) {
        var data = req.body;
        db.login(data.username, data.password, function (err, organizer) {
            if (err) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                if (organizer == null) {
                    res.status(401).send("Login unsucessful. Please try again later");
                } else {
                    var strToHash = organizer.username + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    db.updateToken(organizer._id, token, function (err, organizer) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token });
                    });
                }
            }
        })
    })

    router.get("/logout", function (req, res) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, organizer) {
                if (err || organizer == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.removeToken(organizer._id, function (err, user) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }
    })

 

module.exports = router;
