var mongoose = require('mongoose');
var schema = mongoose.Schema;
var eventSchema = {};
var organizerSchema = {};
var eventModel, organizerModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/eventsDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                eventSchema = schema({
                    name: String,
                    description: String,
                    start: {
                        date: String,
                        time: String
                    },
                    end: {
                        date: String,
                        time: String
                    }
                });

                organizerSchema = schema({
                    name: String,
                    username: String,
                    password: String,
                    company: String,
                    token: String
                });

                var connection = mongoose.connection;
                eventModel = connection.model('events', eventSchema);
                organizerModel = connection.model('organizers', organizerSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    getAllEvents: function (callback) {
        eventModel.find({}, callback);
    },
    addEvent: function (n, d, sd, st, ed, et, callback) {
        var newEvent = new eventModel({
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        });
        newEvent.save(callback);
    },
    getEvent: function (id, callback) {
        eventModel.findById(id, callback);
    },
    updateEvent: function (id, n, d, sd, st, ed, et, callback) {
        var updatedEvent = {
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        };
        eventModel.findByIdAndUpdate(id, updatedEvent, callback);
    },
    deleteEvent: function (id, callback) {
        eventModel.findByIdAndDelete(id, callback);
    },
    addOrganizer: function (n, un, p, c, callback) {
        var newOrganizer = new organizerModel({
            name: n,
            username: un,
            password: p,
            company: c
        });
        newOrganizer.save(callback);
    },
    login: function (u, p, callback) {
        organizerModel.findOne({ username: u, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        organizerModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        organizerModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        organizerModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    }
};

module.exports = database;