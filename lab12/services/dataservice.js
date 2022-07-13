var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/usersDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                userSchema = schema({
                    username: String,
                    password: String,
                    token: String
                });

                var connection = mongoose.connection;
                userModel= connection.model('users', userSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    login: function (u, p, callback) {
        userModel.findOne({ username: u, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        userModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    }
};

module.exports = database;