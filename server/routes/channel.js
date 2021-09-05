const express = require('express');
const router = express.Router();
const User = require('../model/User');
const VideoModel = require('../model/Video');
const LiveStreamingModel = require('../model/LiveStreaming');
const Channel = require('../model/Channel');
const bcrypt = require('bcrypt');
var nodeMailer = require('nodemailer');
var cors = require('cors');
// router.use(cors())


router.post("/smaple", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    const channelOgj = Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email })

    if (!channelOgj.length) {
        return res.status(500).json({
            message: "Channel Doesn't Found or there is a some issue"
        });
    }

    if (channelOgj.length) {
        return res.status(200).json({
            message: channelOgj[0]
        })
    }
})


router.post("/UploadVideoOnDraft", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel Doesn't Found or there is a some issue"
            });
        }
        if (doc) {
            if (doc.length) {
                console.log(doc)
                // doc[0].DraftVideos;
                if (doc[0].DraftVideos.length) {
                    for (var i = 0; i < doc[0].DraftVideos.length; i++) {
                        if (doc[0].DraftVideos[i].VidoeID === req.body.VidoeID) {
                            doc[0].DraftVideos.splice(i, 1)
                            var DraftVideosArr = [];
                            // DraftVideosArr.push(doc[0].DraftVideos)
                            var VideoData = {
                                VidoeID: req.body.VidoeID,
                                VideoTitle: req.body.VideoTitle,
                                VideoURL: req.body.VideoURL,
                                Description: req.body.Description ? req.body.Description : null,
                                ThumbNail: req.body.ThumbNail ? req.body.ThumbNail : null,
                                FileName: req.body.FileName,
                                // DraftDate : 
                            }
                            DraftVideosArr.push(...doc[0].DraftVideos, VideoData)
                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { DraftVideos: DraftVideosArr } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Data is Not Saved in Draft"
                                    })
                                }
                                if (resolve) {
                                    return res.status(200).json({
                                        message: resolve
                                    })
                                }
                            })
                        }
                        else {
                            var DraftVideosArr = [];
                            // DraftVideosArr.push(doc[0].DraftVideos)
                            var VideoData = {
                                VidoeID: req.body.VidoeID,
                                VideoTitle: req.body.VideoTitle,
                                VideoURL: req.body.VideoURL,
                                Description: req.body.Description ? req.body.Description : null,
                                ThumbNail: req.body.ThumbNail ? req.body.ThumbNail : null,
                                FileName: req.body.FileName
                            }
                            DraftVideosArr.push(...doc[0].DraftVideos, VideoData)
                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { DraftVideos: DraftVideosArr } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Data is Not Saved in Draft"
                                    })
                                }
                                if (resolve) {
                                    return res.status(200).json({
                                        message: resolve
                                    })
                                }
                            })
                        }
                    }
                }
                else {
                    var DraftVideosArr = [];
                    var VideoData = {
                        VidoeID: req.body.VidoeID,
                        VideoTitle: req.body.VideoTitle,
                        VideoURL: req.body.VideoURL,
                        Description: req.body.Description ? req.body.Description : null,
                        ThumbNail: req.body.ThumbNail ? req.body.ThumbNail : null,
                        FileName: req.body.FileName
                    }
                    DraftVideosArr.push(VideoData)
                    Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { DraftVideos: DraftVideosArr } }, (error, resolve) => {
                        if (error) {
                            return res.status(404).json({
                                message: "Data is Not Saved in Draft"
                            })
                        }
                        if (resolve) {
                            return res.status(200).json({
                                message: resolve
                            })
                        }
                    })
                }
            }
        }

    })
})


router.post("/PublishVideo", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel Doesn't Found or there is a some issue"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].DraftVideos.length) {
                    for (var i = 0; i < doc[0].DraftVideos.length; i++) {
                        if (doc[0].DraftVideos[i].VidoeID === req.body.VidoeID) {
                            doc[0].DraftVideos.splice(i, 1)
                            // var DraftVideosArr = []
                            // DraftVideosArr.push(...doc[0].DraftVideos)

                            var PublicVideosArr = [];
                            const date = new Date();
                            const month = date.toLocaleString('default', { month: 'long' });
                            const TodayDate = date.getDate();
                            const TodayYear = date.getFullYear();
                            // PublicVideosArr.push(doc[0].PublicVideos);
                            var VideoData = {
                                VidoeID: req.body.VidoeID,
                                VideoTitle: req.body.VideoTitle,
                                VideoURL: req.body.VideoURL,
                                Description: req.body.Description ? req.body.Description : null,
                                ThumbNail: req.body.ThumbNail ? req.body.ThumbNail : null,
                                FileName: req.body.FileName,
                                PublishedDate: month + " " + TodayDate + " " + TodayYear,
                                VideoViews: 0,
                                Comments: []
                            }
                            PublicVideosArr.push(...doc[0].PublicVideos, VideoData)

                            const videomodel = new VideoModel({
                                ChannelID: req.body.ChannelID,
                                OwnerID: req.body.OwnerID,
                                ChannelName: doc[0].ChannelName,
                                Followers: doc[0].Followers,
                                ProfilePic: doc[0].ProfilePic,
                                Comments: [],
                                VidoeID: req.body.VidoeID,
                                VideoTitle: req.body.VideoTitle,
                                VideoURL: req.body.VideoURL,
                                Description: req.body.Description ? req.body.Description : null,
                                ThumbNail: req.body.ThumbNail ? req.body.ThumbNail : null,
                                PublishedDate: month + " " + TodayDate + " " + TodayYear,
                                VideoViews: 0
                            })

                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { PublicVideos: PublicVideosArr, DraftVideos: doc[0].DraftVideos } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Video is Not Published"
                                    })
                                }
                                if (resolve) {

                                    videomodel.save(function (err2, doc2) {
                                        if (err2) {
                                            return res.status(404).json({
                                                message: err2
                                            })
                                        }
                                        if (doc2) {
                                            return res.status(200).json({
                                                message: doc2
                                            })
                                        }
                                    })
                                    // return res.status(200).json({
                                    //     message: resolve
                                    // })
                                }
                            })
                        }
                    }
                }
            }
        }

    })
})

router.post("/DeleteDraftVideo", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel Doesn't Found or there is a some issue"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].DraftVideos.length) {
                    for (var i = 0; i < doc[0].DraftVideos.length; i++) {
                        if (doc[0].DraftVideos[i].VidoeID === req.body.VidoeID) {
                            doc[0].DraftVideos.splice(i, 1)

                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { DraftVideos: doc[0].DraftVideos } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Video is Not Published"
                                    })
                                }
                                if (resolve) {
                                    return res.status(200).json({
                                        message: resolve
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }

    })

})

router.post("/DeletePublishVideo", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel Doesn't Found or there is a some issue"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].PublicVideos.length) {
                    for (var i = 0; i < doc[0].PublicVideos.length; i++) {
                        if (doc[0].PublicVideos[i].VidoeID === req.body.VidoeID) {
                            doc[0].PublicVideos.splice(i, 1)

                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID, Email: req.body.Email }, { "$set": { PublicVideos: doc[0].PublicVideos } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Video is Not Published"
                                    })
                                }
                                if (resolve) {
                                    VideoModel.deleteOne({ VidoeID: req.body.VidoeID, ChannelID: req.body.ChannelID, VideoURL: req.body.VideoURL }, {}, (err2, doc2) => {
                                        if (err2) {
                                            return res.status(404).json({
                                                message: err2
                                            })
                                        }
                                        if (doc2) {
                                            return res.status(200).json({
                                                message: doc2
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }

    })

})



router.post("/AddPublicVideoView", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    // Channel.findOneAndUpdate({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, {})
    Channel.find({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel doesn't exists"
            });
        }
        if (doc) {
            if (doc.length) {
                // doc[0].PublicVideos
                if (doc[0].PublicVideos.length) {
                    for (var i = 0; i < doc[0].PublicVideos.length; i++) {
                        if (doc[0].PublicVideos[i].VidoeID === req.body.VidoeID) {
                            var PublicVideosArr = [];
                            var OldObj = doc[0].PublicVideos.splice(i, 1);
                            OldObj[0].VideoViews = OldObj[0].VideoViews + 1
                            PublicVideosArr.push(...doc[0].PublicVideos, OldObj[0])

                            Channel.updateOne({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, { "$set": { PublicVideos: PublicVideosArr } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: error
                                    })
                                }
                                if (resolve) {
                                    return res.status(200).json({
                                        message: resolve
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }
    })
})

router.post("/AddComment", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    Channel.find({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel doesn't exists"
            });
        }
        if (doc) {
            if (doc.length) {
                // doc[0].PublicVideos
                if (doc[0].PublicVideos.length) {
                    for (var i = 0; i < doc[0].PublicVideos.length; i++) {
                        if (doc[0].PublicVideos[i].VidoeID === req.body.VidoeID) {
                            var PublicVideosArr = [];
                            var OldObj = doc[0].PublicVideos.splice(i, 1);
                            OldObj[0].Comments.push({
                                CommentID: req.body.CommentID,
                                CommentBy_Name: req.body.CommentBy_Name,
                                CommentBy_ID: req.body.CommentBy_ID,
                                CommentMsg: req.body.CommentMsg
                            })
                            PublicVideosArr.push(...doc[0].PublicVideos, OldObj[0])

                            Channel.updateOne({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, { "$set": { PublicVideos: PublicVideosArr } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: error
                                    })
                                }
                                if (resolve) {

                                    VideoModel.find({ VidoeID: req.body.VidoeID, ChannelID: req.body.ChannelID }, (NotFound, Found) => {
                                        if (NotFound) {
                                            return res.status(500).json({
                                                message: "Video doesn't exists"
                                            });
                                        }
                                        if (Found) {
                                            if (Found.length) {

                                                var AllComments = []
                                                var CommentOBJ = {
                                                    CommentID: req.body.CommentID,
                                                    CommentBy_Name: req.body.CommentBy_Name,
                                                    CommentBy_ID: req.body.CommentBy_ID,
                                                    CommentMsg: req.body.CommentMsg
                                                }
                                                AllComments.push(...Found[0].Comments, CommentOBJ)

                                                VideoModel.updateOne({ VidoeID: req.body.VidoeID, ChannelID: req.body.ChannelID }, { "$set": { Comments: AllComments } }, (againerr, againres) => {
                                                    if (againerr) {
                                                        return res.status(404).json({
                                                            message: againerr
                                                        })
                                                    }
                                                    if (againres) {
                                                        return res.status(200).json({
                                                            message: againres
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }
    })
})


router.post("/SchedulePrivateStreaming", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    Channel.find({ ChannelID: req.body.ChannelID }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel doen't exists"
            })
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].SchedulePrivateStreaming.length) {
                    Channel.find({ ChannelID: req.body.ChannelID, "SchedulePrivateStreaming.StreamID": req.body.StreamID }, { _id: 0, SchedulePrivateStreaming: { $elemMatch: { StreamID: req.body.StreamID } } }, (error2, resolve2) => {
                        if (error2) {
                            return res.status(500).json({
                                message: err
                            });
                        }
                        if (resolve2) {
                            if (resolve2.length) {
                                console.log(resolve2)
                                Channel.updateOne({ ChannelID: req.body.ChannelID },
                                    { $pull: { "SchedulePrivateStreaming": { "StreamID": req.body.StreamID } } }, {}, (error3, resolve3) => {
                                        if (error3) {
                                            console.log("ERROR#3 ==>", error3)
                                        }
                                        if (resolve3) {
                                            console.log("RESOLVE#3 ==>", resolve3)
                                            Channel.find({ ChannelID: req.body.ChannelID }, (error4, resolve4) => {
                                                if (error4) {
                                                }
                                                if (resolve4) {
                                                    if (resolve4.length) {
                                                        var SchedulePrivateStreamingArr = [];
                                                        var StreamingData = {
                                                            StreamID: req.body.StreamID,
                                                            StreamTitle: req.body.StreamTitle,
                                                            StreamDesc: req.body.StreamDesc,
                                                            StreamThumbnail: req.body.StreamThumbnail,
                                                        }
                                                        SchedulePrivateStreamingArr.push(...resolve4[0].SchedulePrivateStreaming, StreamingData)
                                                        Channel.updateOne({ ChannelID: req.body.ChannelID }, { "$set": { SchedulePrivateStreaming: SchedulePrivateStreamingArr } }, (error, resolve) => {
                                                            if (error) {
                                                                return res.status(404).json({
                                                                    message: error
                                                                });
                                                            }
                                                            if (resolve) {
                                                                return res.status(200).json({
                                                                    message: resolve
                                                                });
                                                            }
                                                        })
                                                    }
                                                }
                                            })

                                        }
                                    })
                            }
                            else {
                                console.log("ELSE CHALA HAI MEAN ID NOT MATCHED")
                                var SchedulePrivateStreamingArr = [];
                                var StreamingData = {
                                    StreamID: req.body.StreamID,
                                    StreamTitle: req.body.StreamTitle,
                                    StreamDesc: req.body.StreamDesc,
                                    StreamThumbnail: req.body.StreamThumbnail,
                                }
                                SchedulePrivateStreamingArr.push(...doc[0].SchedulePrivateStreaming, StreamingData)
                                Channel.updateOne({ ChannelID: req.body.ChannelID }, { "$set": { SchedulePrivateStreaming: SchedulePrivateStreamingArr } }, (error, resolve) => {
                                    if (error) {
                                        return res.status(404).json({
                                            message: error
                                        });
                                    }
                                    if (resolve) {
                                        return res.status(200).json({
                                            message: resolve
                                        });
                                        // console.log(resolve)
                                    }
                                })
                            }
                        }
                    })
                }
                else {
                    var SchedulePrivateStreamingArr = [];
                    var StreamingData = {
                        StreamID: req.body.StreamID,
                        StreamTitle: req.body.StreamTitle,
                        StreamDesc: req.body.StreamDesc,
                        StreamThumbnail: req.body.StreamThumbnail,
                    }
                    SchedulePrivateStreamingArr.push(StreamingData)
                    Channel.updateOne({ ChannelID: req.body.ChannelID }, { "$set": { SchedulePrivateStreaming: SchedulePrivateStreamingArr } }, (error, resolve) => {
                        if (error) {
                            return res.status(404).json({
                                message: error
                            });
                        }
                        if (resolve) {
                            return res.status(200).json({
                                message: resolve
                            });
                        }
                    })
                }
            }
        }
    })
})


router.post("/NowPublicStreaming", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    Channel.find({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "Channel Doesn't Found or there is a some issue"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].SchedulePrivateStreaming.length) {
                    for (var i = 0; i < doc[0].SchedulePrivateStreaming.length; i++) {
                        if (doc[0].SchedulePrivateStreaming[i].StreamID === req.body.StreamID) {
                            doc[0].SchedulePrivateStreaming.splice(i, 1)
                            // var DraftVideosArr = []
                            // DraftVideosArr.push(...doc[0].DraftVideos)

                            var NowStreamingArr = [];
                            const date = new Date();
                            const month = date.toLocaleString('default', { month: 'long' });
                            const TodayDate = date.getDate();
                            const TodayYear = date.getFullYear();
                            var StreamingData = {
                                StreamID: req.body.StreamID,
                                StreamTitle: req.body.StreamTitle,
                                StreamDesc: req.body.StreamDesc,
                                StreamData : req.body.StreamData,
                                StreamThumbnail: req.body.StreamThumbnail,
                                StreamDate: month + " " + TodayDate + " " + TodayYear,
                                StreamLiveViewers: req.body.StreamLiveViewers,
                                StreamComments: req.body.StreamComments
                            }
                            NowStreamingArr.push(...doc[0].NowPublicStreaming, StreamingData)

                            const liveStreamingmodel = new LiveStreamingModel({
                                ChannelID: req.body.ChannelID,
                                OwnerID: req.body.OwnerID,
                                ChannelName: req.body.ChannelName,
                                Followers: req.body.Followers,
                                ProfilePic: req.body.ProfilePic,
                                StreamComments: req.body.StreamComments,
                                StreamID: req.body.StreamID,
                                StreamData : req.body.StreamData,
                                StreamTitle: req.body.StreamTitle,
                                StreamDesc: req.body.StreamDesc,
                                StreamThumbnail: req.body.StreamThumbnail,
                                StreamLiveViewers: req.body.StreamLiveViewers,
                            })

                            Channel.updateOne({ ChannelID: req.body.ChannelID, OwnerID: req.body.OwnerID }, { "$set": { NowPublicStreaming: NowStreamingArr, SchedulePrivateStreaming: doc[0].SchedulePrivateStreaming } }, (error, resolve) => {
                                if (error) {
                                    return res.status(404).json({
                                        message: "Video is Not Published"
                                    })
                                }
                                if (resolve) {
                                    liveStreamingmodel.save(function (err2, doc2) {
                                        if (err2) {
                                            return res.status(404).json({
                                                message: err2
                                            })
                                        }
                                        if (doc2) {
                                            return res.status(200).json({
                                                message: doc2
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }

    })
})



module.exports = router;