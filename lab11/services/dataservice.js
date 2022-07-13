var mongoose = require('mongoose');
var schema = mongoose.Schema;
var roomSchema = {};
var flightSchema = {};
var roomModel, flightModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/RestApiDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                roomSchema = schema({
                    roomNumber: Number,
                    price: String,
                    type: String,
                    size: Number
                });

                flightSchema = schema({
                    flightNumber: String,
                    source: String,
                    destination: String,
                    distance: Number
                });

                var connection = mongoose.connection;
                roomModel = connection.model("rooms", roomSchema);
                flightModel = connection.model("flights", flightSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addRoom: function(rn, p, t, s, callback){
        var newRoom = new roomModel({
            roomNumber: rn,
            price: p,
            type: t,
            size: s
        });
        newRoom.save(callback);
    },
    getRooms: function(callback){
        roomModel.find({}, callback);
    },
    searchRoom: function(t,callback) {
        roomModel.find({type: new RegExp(t,'i')},callback);
    },
    getRoomById:function(id,callback){
        roomModel.findById(id, callback);
    },
    updateRoomPrice: function(t,p,callback){
        roomModel.updateMany({type:t},{price:p},callback);
    },
    deleteRoomByType: function(t,callback){
        roomModel.deleteMany({type:t},callback);
    },
    addFlight: function(fn, s, dn, dist,callback){
        var newFlight = new flightModel({
            flightNumber: fn,
            source: s,
            destination: dn,
            distance: dist
        });
        newFlight.save(callback);
    },
    getFlights: function(callback){
        flightModel.find({},callback);
    },
    getFlightsByDestination: function(dn,callback){
        flightModel.find({destination: dn},callback);
    },
    getFlightById: function(id,callback){
        flightModel.findById(id,callback);
    },
    updateFlight:function(id,fn, s, dn, dist, callback){
        var updateOptions = {
            flightNumber:fn,
            source: s,
            destination: dn,
            distance: dist
        }

        flightModel.findByIdAndUpdate(id,updateOptions,{new:true},callback);
    },
    deleteFlightBySource: function(s,callback){
        flightModel.deleteMany({source:s},callback);
    },
    deleteAllFlights: function(callback){
        flightModel.deleteMany({},callback);
    }
};

module.exports = database;