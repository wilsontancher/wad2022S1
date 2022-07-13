var express = require('express');
var db = require('./services/dataservice.js');

db.connect();

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));

router.get('/api/rooms', function (req, res) {
    db.getRooms(function (err, rooms) {
        if (err) {
            res.status(500).send("Unable to get all rooms");
        } else {
            res.status(200).send(rooms);
        }
    })
})

router.post('/api/rooms', function (req, res) {
    var data = req.body;
    db.addRoom(data.roomNumber, data.price, data.type, data.size, function (err, room) {
        if (err) {
            res.status(500).send("Unable to add a new room");
        } else {
            res.status(200).send(room);
        }
    })
});

router.put('/api/rooms', function (req, res) {
    var data = req.body;
    db.updateRoomPrice(data.type, data.price, function (err, rooms) {
        if (err) {
            res.status(500).send("Unable to update the rooms");
        } else {
            if (rooms==null || rooms.modifiedCount == 0) {
                res.status(200).send("No rooms were updated");
            } else {
                res.status(200).send("Rooms successfully updated");
            }
        }
    })
});

router.get('/api/rooms/:id', function (req, res) {
    var id = req.params.id;
    db.getRoomById(id, function (err, room) {
        if (err) {
            res.status(500).send("Unable to find a room with this id");
        } else {
            res.status(200).send(room);
        }
    });
});

router.post('/api/search', function (req, res) {
    var type = req.body.type;
    db.searchRoom(type, function (err, rooms) {
        if (err) {
            res.status(500).send("Unable to search rooms at this moment");
        } else {
            res.status(200).send(rooms);
        }
    })
});

router.delete('/api/rooms/:roomType', function (req, res) {
    var roomType = req.params.roomType;
    db.deleteRoomByType(roomType, function (err, rooms) {
        if (err) {
            res.status(500).send("Unable to delete rooms");
        } else {
            if (rooms==null || rooms.deletedCount == 0) {
                res.status(200).send("No rooms were deleted");
            } else {
                res.status(200).send("Rooms with the room type " + roomType + " are deleted.");
            }
        }
    })
});

router.get('/api/flights', function (req, res) {
    db.getFlights(function (err, flights) {
        if (err) {
            res.status(500).send("Unable to get all flights");
        } else {
            res.status(200).send(flights);
        }
    });
});

router.post('/api/flights', function (req, res) {
    var data = req.body;
    db.addFlight(data.flightNumber, data.source, data.destination, data.distance, function (err, flight) {
        if (err) {
            res.status(500).send("Unable to add a new flight");
        } else {
            res.status(200).send(flight);
        }
    })
});

router.delete('/api/flights', function (req, res) {
    db.deleteAllFlights(function (err, flights) {
        if (err) {
            res.status(500).send("Unable to delete flights");
        } else {
            if (flights==null || flights.deletedCount == 0) {
                res.status(200).send("No flights were deleted.");
            } else {
                res.status(200).send("All flights have been deleted");
            }
        }
    })
});

router.get('/api/flights/destination/:destination', function (req, res) {
    var destination = req.params.destination;
    db.getFlightsByDestination(destination, function (err, flights) {
        if (err) {
            res.status(500).send("Unable to retrieve flights by destination");
        } else {
            res.status(200).send(flights);
        }
    })
});

router.get('/api/flights/:id', function (req, res) {
    var id = req.params.id;
    db.getFlightById(id, function (err, flight) {
        if (err) {
            res.status(500).send("Unable to retrieve flight by id");
        } else {
            res.status(200).send(flight);
        }
    })
});

router.put('/api/flights/:id', function (req, res) {
    var id = req.params.id;
    var flightNumber = req.body.flightNumber;
    var source = req.body.source;
    var destination = req.body.destination;
    var distance = req.body.distance;
    db.updateFlight(id, flightNumber, source, destination, distance, function (err, flight) {
        if (err) {
            res.status(500).send("Unable to update flight detail");
        } else {
            res.status(200).send(flight);
        }
    })
});

router.delete('/api/flights/source/:source', function (req, res) {
    var source = req.params.source;
    db.deleteFlightBySource(source, function (err, flight) {
        if (err) {
            res.status(500).send("Unable to delete flights from " + source);
        } else {
            if (flight==null || flight.deletedCount == 0) {
                res.status(200).send("No flights have been deleted");
            } else {
                res.status(200).send("Flights from " + source + " have been successfully deleted.");
            }
        }
    })
});


module.exports = router;
