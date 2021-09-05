const express = require('express');
const router = express.Router();
const User = require('../model/User');
const EmailPending = require('../model/EmailPending');
const Channel = require('../model/Channel');
const Video = require('../model/Video');
const bcrypt = require('bcrypt');
var nodeMailer = require('nodemailer');
var cors = require('cors');
const { db } = require('../model/User');
const AccessToken = require('twilio').jwt.AccessToken;
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// SKa02b275ac3ed34ca1af85b536ff4de7b

router.post("/video/token", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    const VideoGrant = AccessToken.VideoGrant;

    const twilioAccountSid = 'ACa089da91ee94919a77392e043ab9e5db';
    const twilioApiKey = 'SKa02b275ac3ed34ca1af85b536ff4de7b';
    const twilioApiSecret = '8DPMAR8R2I9cAWn9ch6K74cup267zVDG';

    const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);

    const videoGrant = new VideoGrant({
        room: req.body.room
    });

    // Add the grant to the token
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    // console.log(token.toJwt());
    return res.status(200).json({
        Token: token.toJwt()
    })
})


router.get("/getAllVideos", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    db.collection("videos").find().toArray(function (err, data) {
        res.send(data);
    });
})

router.get("/getNowLiveStreamings", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    db.collection("livestreamings").find().toArray(function (err, data) {
        res.send(data);
    });
})


router.get("/getAllChannels", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    db.collection("channels").find().toArray(function (err, data) {
        res.send(data);
    });
})



router.post("/SendEmail", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    User.find({ Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(404).json({
                message: err
            })
        }
        if (doc) {
            if (doc.length) {
                return res.status(404).json({
                    message: "Email is Already link with another account"
                })
            }
            else {
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'Ahmedrazaattari536@gmail.com',
                        pass: 'oggdhfljpztxvlli'
                    }
                });
                let mailOptions = {
                    from: '"Vidoe" <Online.freelancer536@gmail.com>', // sender address
                    to: req.body.Email,
                    subject: `Verify your Email address`,
                    html: `<div style="padding : 20px;">
                    <div style="text-align : center">
                        <img src="cid:unique@kreata.ee" style="width : 150px;" />
                    </div>
                    <br>
                        <h2 style="color : black; font-weight : bold;">Verify your email address to complete registration</h2>
                        <br>
                        <p style="font-size : 18px; font-family : Arial; color : black;">Hi</p>
                        <p style="font-size : 19px; color : black; font-family : Arial;">Thanks for your interest in joining Hallelujah Gospel live Streaming! To complete your registration, We need you to verify your email address. Enter below code in website signup page</p>
                        <div style="text-align : center">
                            <h1 style="text-align : center">${req.body.VerificationCode}</h1>
                        </div>
                        <small style="font-size : 15px; color : black; font-family : Arial;">if you didnt make this request, simply ignore this message.</small>
                    </div>`,
                    attachments: [{
                        filename: 'logo.gif',
                        path: __dirname + '/logo.gif',
                        cid: 'unique@kreata.ee'
                    }]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    if (info) {
                        const pending = new EmailPending({
                            _id: req.body._id,
                            Email: req.body.Email,
                            VerificationCode: req.body.VerificationCode
                        })
                        pending.save(function (err, doc) {
                            if (err) {
                                return res.status(404).json({
                                    message: err
                                })
                            }
                            if (doc) {
                                return res.status(200).json({
                                    user: doc
                                })
                            }
                        })
                    }
                });

            }
        }
    })

})

router.post("/VerifyCode", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    EmailPending.find({ _id: req.body._id, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(404).json({
                message: err
            })
        }
        if (doc) {
            if (doc.length) {
                console.log(doc[0].VerificationCode)
                if (doc[0].VerificationCode == req.body.VerificationCode) {
                    return res.status(200).json({
                        message: "Email Verified Successfully"
                    })
                }
                else {
                    res.status(404).json({
                        message: "Verification Code is Not Matched"
                    })
                }

            }

        }
    })
})


router.post("/register", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.find({ Email: req.body.Email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User with the given email address already exists"
                });
            }
            else {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {
                    if (err) {
                        console.log("ERROR")
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: req.body.OwnerID,
                            ChannelID: req.body.ChannelID,
                            Email: req.body.Email,
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            Subscriptions: [],
                            WatchLater: [],
                            LikedVideos: [],
                            Notifications: [],
                            PaymentVerified: false,
                            EmailVerified: true,
                            ProfilePic: req.body.ProfilePic ? req.body.ProfilePic : null,
                            Password: hash,
                        })
                        user.save(function (err, doc) {
                            if (err) {
                                return res.status(404).json({
                                    message: err
                                })
                            }
                            if (doc) {
                                const channel = new Channel({
                                    ChannelID: req.body.ChannelID,
                                    OwnerID: req.body.OwnerID,
                                    Email: req.body.Email,
                                    ChannelName: req.body.FirstName + " " + req.body.LastName,
                                    ProfilePic: req.body.ProfilePic ? req.body.ProfilePic : null,
                                    PrivateVideos: [],
                                    PublicVideos: [],
                                    Followers: 0,
                                    DraftVideos: [],
                                    Comments: [],
                                    SchedulePublicStreaming: [],
                                    SchedulePrivateStreaming: [],
                                    NowPublicStreaming: [],
                                    NowPrivateStreaming: []
                                })
                                channel.save(function (err2, doc2) {
                                    if (err2) {
                                        return res.status(404).json({
                                            message: err2
                                        })
                                    }
                                    if (doc2) {
                                        return res.status(200).json({
                                            user: doc2
                                        })
                                    }
                                })
                            }

                        })
                    }
                })
            }
        })
        .catch(error => {
            return res.status(404).json({
                message: error
            })
        })
})


router.post('/login', cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    //Check Email
    const user = await User.find({ Email: req.body.Email });

    if (!user.length) {
        return res.status(500).json({
            message: "Mail not found user doen't exists"
        });
    }

    //Compare Password
    const passwordMatched = bcrypt.compareSync(req.body.Password, user[0].Password);

    if (!passwordMatched) {
        return res.status(401).json({
            message: "Auth Failed"
        })
    } else {
        return res.status(200).json({
            message: "Auth Success",
            user: user
        })
    }

})


router.post("/GetProfile", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    const user = await User.find({ _id: req.body._id });

    if (!user.length) {
        return res.status(500).json({
            message: "User doesn't exit"
        });
    }

    if (user.length) {
        return res.status(200).json({
            user: user
        })
    }

})


router.post("/GetChannelProfile", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {

    const Channeldata = await Channel.find({ ChannelID: req.body.ChannelID });

    if (!Channeldata.length) {
        return res.status(500).json({
            message: "Channel doesn't exit"
        });
    }

    if (Channeldata.length) {
        return res.status(200).json({
            Channel: Channeldata
        })
    }

})


router.post("/LikeVideo", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.find({ _id: req.body._id, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "User doesn't exit"
            });
        }
        if (doc) {
            if (doc.length) {
                var NewLikeVideo = {
                    VidoeID: req.body.VidoeID,
                    VideoTitle: req.body.VideoTitle,
                    VideoURL: req.body.VideoURL,
                    Description: req.body.Description,
                    ThumbNail: req.body.ThumbNail,
                    PublishedDate: req.body.PublishedDate,
                    ChannelID: req.body.ChannelID,
                    VideoViews: req.body.VideoViews,
                    ChannelName: req.body.ChannelName,
                }
                var AllLikedVideos = [];
                AllLikedVideos.push(...doc[0].LikedVideos, NewLikeVideo)
                User.updateOne({ _id: req.body._id, Email: req.body.Email }, { "$set": { LikedVideos: AllLikedVideos } }, (error, resolve) => {
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
    })
})

router.post("/UNLikeVideo", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.find({ _id: req.body._id, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "User doesn't exit"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].LikedVideos.length) {
                    for (var i = 0; i < doc[0].LikedVideos.length; i++) {
                        if (doc[0].LikedVideos[i].VidoeID === req.body.VidoeID) {
                            doc[0].LikedVideos.splice(i, 1)

                            User.updateOne({ _id: req.body._id, Email: req.body.Email }, { "$set": { LikedVideos: doc[0].LikedVideos } }, (error, resolve) => {
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


router.post("/AddWatchLater", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.find({ _id: req.body._id, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "User doesn't exit"
            });
        }
        if (doc) {
            if (doc.length) {
                var NewWatchLaterVideo = {
                    VidoeID: req.body.VidoeID,
                    VideoTitle: req.body.VideoTitle,
                    VideoURL: req.body.VideoURL,
                    Description: req.body.Description,
                    ThumbNail: req.body.ThumbNail,
                    PublishedDate: req.body.PublishedDate,
                    ChannelID: req.body.ChannelID,
                    VideoViews: req.body.VideoViews,
                    ChannelName: req.body.ChannelName,
                }
                var AllWatchLaterVideos = [];
                AllWatchLaterVideos.push(...doc[0].WatchLater, NewWatchLaterVideo)
                User.updateOne({ _id: req.body._id, Email: req.body.Email }, { "$set": { WatchLater: AllWatchLaterVideos } }, (error, resolve) => {
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
    })
})


router.post("/RemoveWatchLater", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.find({ _id: req.body._id, Email: req.body.Email }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message: "User doesn't exit"
            });
        }
        if (doc) {
            if (doc.length) {
                if (doc[0].WatchLater.length) {
                    for (var i = 0; i < doc[0].WatchLater.length; i++) {
                        if (doc[0].WatchLater[i].VidoeID === req.body.VidoeID) {
                            doc[0].WatchLater.splice(i, 1)

                            User.updateOne({ _id: req.body._id, Email: req.body.Email }, { "$set": { WatchLater: doc[0].WatchLater } }, (error, resolve) => {
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


router.post("/Subscribe", cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com', 'https://halelujjahgospellivestreaming.herokuapp.com'],
    methods: ['GET', 'POST']
}), async (req, res) => {
    User.findByIdAndUpdate({ _id: req.body._id }, {
        "$push": {
            Subscriptions: {
                ChannelID: req.body.ChannelID,
                ChannelName: req.body.ChannelName
            }
        }
    }, (error, resolve) => {
        if (error) {
            return res.status(404).json({
                message: error
            })
        }
        if (resolve) {
            Channel.find({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: "Channel doesn't exists"
                    });
                }
                if (doc) {
                    if (doc.length) {
                        var TotalFollowers = doc[0].Followers + 1;
                        Channel.updateOne({ ChannelID: req.body.ChannelID, ChannelName: req.body.ChannelName }, { "$set": { Followers: TotalFollowers } }, (error, resolve) => {
                            if (error) {
                                return res.status(404).json({
                                    message: error
                                })
                            }
                            if (resolve) {
                                return res.status(200).json({
                                    message: "Subscribe Succesfully"
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})


// These Portion contain All the apis that related to Channel

module.exports = router;