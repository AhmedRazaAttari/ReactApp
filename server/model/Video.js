const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    ChannelID: String,
    OwnerID: String,
    ChannelName: String,
    Followers: Number,
    ProfilePic: String,
    Comments: Array,
    VidoeID: String,
    VideoTitle: String,
    VideoURL: String,
    Description: String,
    ThumbNail: String,
    PublishedDate: String,
    VideoViews: Number
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;