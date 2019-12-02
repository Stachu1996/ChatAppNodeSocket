'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const Mongoose = mongoose.connect(config.dbURI);

// Log an error if the connection fails
/*
Mongoose.connection.on('error', error => {
    console.error("MongoDB Error: ", error);
});
*/

//User Schema
const chatUser = new mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String,
});

let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    userModel
};