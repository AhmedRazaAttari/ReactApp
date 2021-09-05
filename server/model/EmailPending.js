const mongoose = require('mongoose');

const EmailPending = new mongoose.Schema({
    _id: String,
    Email: String,
    VerificationCode: String
});

const Pending = mongoose.model('Pending', EmailPending);

module.exports = Pending;