const mongoose = require('mongoose');

const LiveStreamSchema = new mongoose.Schema({
    ChannelID: String,
    OwnerID: String,
    ChannelName: String,
    Followers: Number,
    ProfilePic: String,
    StreamComments: Array,
    StreamID: String,
    StreamData : Array,
    StreamTitle: String,
    StreamDesc: String,
    StreamThumbnail: String,
    StreamLiveViewers : Number,
});

const LiveStreamings = mongoose.model('LiveStreamings', LiveStreamSchema);

module.exports = LiveStreamings;