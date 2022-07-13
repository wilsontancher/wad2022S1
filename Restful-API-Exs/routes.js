var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');
const { time } = require('console');

db.connect();

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));

router.post('/api/timetables', function (req, res) {
    var data = req.body;
    console.log(data)
    db.addTimetable(data.day, data.start, data.end, data.module, data.tutor,
        function (err, timetable) {
            if (err) {
                res.status(500).send("Unable to create timetable");
            } else {
                res.status(200).send(timetable);
            }
        })
});


router.get('/api/timetables', function (req, res) {
    db.getTimetables(function (err, timetables) {
        if (err) {
            res.status(500).send("Error retrieving timetables.");
        } else {
            res.status(200).send(timetables);
        }
    })
})

router.get('/api/modules/:tutor', function (req, res) {
    var tutor = req.params.tutor;
    db.getTimetablesOfTutor(tutor, function (err, timetable) {
        if (err) {
            res.status(500).send("Unable to retrieve modules taught by the tutor");
        } else {
            var timetables = [];
            for (var i in timetable) {
                var tt = timetable[i];
                timetables.push({ "day": tt.day, "duration": tt.start + " to " + tt.end, "module code": tt.module.code });
            }

            res.status(200).send(timetables);
        }
    })
})

router.get('/api/timetables/:id', function (req, res) {
    var id = req.params.id;
    db.getTimetable(id, function (err, timetable) {
        if (err) {
            res.status(500).send("Error retrieving timetable");
        } else {
            var tutor = timetable.tutor;
            var module = timetable.module;
            res.status(200).send("This module - " + module.name + " is taught on " + timetable.day + " from " + timetable.start + " to " +
                timetable.end + ". The module tutor is " + tutor.name + " and his/her office is at " + tutor.office + ".");
        }
    })
})


module.exports = router;
