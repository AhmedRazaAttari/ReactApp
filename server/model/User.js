const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: String,
    ChannelID: String,
    Email: String,
    FirstName: String,
    LastName: String,
    Password: String,
    Subscriptions : Array,
    WatchLater : Array,
    LikedVideos : Array,
    Notifications : Array,
    PaymentVerified: Boolean,
    EmailVerified: Boolean,
    ProfilePic: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;