const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    ChannelID: String,
    OwnerID: String,
    Email: String,
    ChannelName: String,
    PrivateVideos: Array,
    PublicVideos: Array,
    PublicStreamedVideos : Array,
    Followers : Number,
    ProfilePic: String,
    DraftVideos: Array,
    Comments: Array,
    SchedulePublicStreaming: Array,
    SchedulePrivateStreaming: Array,
    NowPublicStreaming: Array,
    NowPrivateStreaming: Array,
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;