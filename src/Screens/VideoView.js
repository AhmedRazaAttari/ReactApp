import React, { useContext, useEffect, useState, useRef } from 'react';
import { faChevronDown, faArrowCircleDown, faBell, faVideo, faBookmark, faEnvelope, faHeart, faHome, faMap, faStoreAlt, faStream, faSubscript, faUsers, faUpload, faSignal, faWifi, faCalendarTimes, faList, faPlay, faPlayCircle, faTimesCircle, faClock, faTools, faThumbsUp, faShare, faAlignJustify, faCross, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo1.gif';
import { Form, Modal, Button, Dropdown } from 'react-bootstrap';
import android from '../assets/android.png';
import ios from '../assets/ios.png';
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';
import firebase from '../Config/FirebaseConfig';
import { Redirect } from 'react-router'
import { faGooglePlay, faPlaystation } from '@fortawesome/free-brands-svg-icons';
import loadingDataGif from '../assets/loadingdata.gif';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


function VideoView(props) {

    const classes = useStyles();
    const myVideo = useRef();
    const [stream, setStream] = useState(null)
    const [IsChannel, SetIsChannel] = useState(null);
    const [UserChannel, SetUserChannel] = useState(null);
    const [dataFetched, SetdataFetched] = useState(null);
    const [show, setShow] = useState(false);
    const [DesciptionModal, setDescription] = useState(false);
    const [desc, setDesc] = useState()
    const [title, setTitle] = useState()
    const [ReadyForLive, setReady] = useState(false);

    const [AllVideos, setAllVideos] = useState([]);
    const [SpecificVideo, setSpecificVideo] = useState([]);

    const [AlreadyLikedVideo, setAlreadyLikedVideo] = useState();
    const [AlreadyWatchLaterVideo, setAlreadyWatchLaterVideo] = useState();


    const [comment, setComment] = useState()


    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();

    const [isloading, setIsloading] = useState()



    useEffect(() => {
        document.getElementById("SidebarID").style.display = "none"
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setIsloading(true)
                fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/GetProfile", {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: user.uid,
                    })
                }).then(r => r.json().then(data => {
                    if (!r.ok) {
                        console.log(data.message)
                    }
                    else {
                        // console.log(data.user[0])
                        setUserID(user.uid)
                        data.user[0].ProfilePic && setUserProfilePic(data.user[0].ProfilePic)
                        setUserEmail(data.user[0].Email)
                        SetUserFirstName(data.user[0].FirstName)
                        setUserLastName(data.user[0].LastName)
                        setUserChannelID(data.user[0].ChannelID)


                        var items = [];
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllVideos")
                            .then(res => res.json())
                            .then(response => {
                                for (var i = 0; i < response.length; i++) {
                                    // console.log(response[i].VidoeID)
                                    console.log(props.match.params.VideoID)
                                    var x = props.match.params.VideoID;
                                    if (x.indexOf(':') !== -1) {
                                        //split and get
                                        var y = x.split(':')[1];
                                    }

                                    if (response[i].VidoeID == y) {
                                        // console.log(response[i].VideoURL)
                                        items.push(response[i])
                                        setAllVideos(response)
                                    }
                                }
                                if (data.user[0].LikedVideos.length) {
                                    for (var z = 0; z < data.user[0].LikedVideos.length; z++) {
                                        if (data.user[0].LikedVideos[z].VidoeID === y) {
                                            setAlreadyLikedVideo(true)
                                        }
                                    }
                                }

                                if (data.user[0].WatchLater.length) {
                                    for (var c = 0; c < data.user[0].WatchLater.length; c++) {
                                        if (data.user[0].WatchLater[c].VidoeID === y) {
                                            setAlreadyWatchLaterVideo(true)
                                        }
                                    }
                                }
                            }).then(() => {
                                console.log(items)
                                setSpecificVideo(items)
                                setIsloading(false)
                            })
                    }
                }))
            }
            else {
            }
        })
    }, [])


    function Refresh() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/GetProfile", {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: user.uid,
                    })
                }).then(r => r.json().then(data => {
                    if (!r.ok) {
                        console.log(data.message)
                    }
                    else {
                        // console.log(data.user[0])
                        setUserID(user.uid)
                        data.user[0].ProfilePic && setUserProfilePic(data.user[0].ProfilePic)
                        setUserEmail(data.user[0].Email)
                        SetUserFirstName(data.user[0].FirstName)
                        setUserLastName(data.user[0].LastName)
                        setUserChannelID(data.user[0].ChannelID)

                        var items = [];
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllVideos")
                            .then(res => res.json())
                            .then(response => {
                                for (var i = 0; i < response.length; i++) {
                                    // console.log(response[i].VidoeID)
                                    console.log(props.match.params.VideoID)
                                    var x = props.match.params.VideoID;
                                    if (x.indexOf(':') !== -1) {
                                        //split and get
                                        var y = x.split(':')[1];
                                    }

                                    if (response[i].VidoeID == y) {
                                        // console.log(response[i].VideoURL)
                                        items.push(response[i])
                                        setAllVideos(response)
                                    }
                                }
                                if (data.user[0].LikedVideos.length) {
                                    for (var z = 0; z < data.user[0].LikedVideos.length; z++) {
                                        if (data.user[0].LikedVideos[z].VidoeID === y) {
                                            setAlreadyLikedVideo(true)
                                        }
                                    }
                                }
                                if (data.user[0].WatchLater.length) {
                                    for (var c = 0; c < data.user[0].WatchLater.length; c++) {
                                        if (data.user[0].WatchLater[c].VidoeID === y) {
                                            setAlreadyWatchLaterVideo(true)
                                        }
                                    }
                                }
                            }).then(() => {
                                console.log(items)
                                setSpecificVideo(items)
                            })
                    }
                }))
            }
            else {
            }
        })
    }


    function SendComment(items) {

        var randomNum = Math.floor(10000 + Math.random() * 50000);
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/AddComment", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                ChannelID: items.ChannelID,
                ChannelName: items.ChannelName,
                VidoeID: items.VidoeID,
                CommentID: randomNum,
                CommentBy_Name: UserFirstName + " " + UserLastName,
                CommentBy_ID: userID,
                CommentMsg: comment,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log("DONE")
                setComment()
                Refresh()
            }
        }))
    }

    function LikeVideo(items) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/LikeVideo", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                _id: firebase.auth().currentUser.uid,
                Email: UserEmail,
                VidoeID: items.VidoeID,
                VideoTitle: items.VideoTitle,
                VideoURL: items.VideoURL,
                Description: items.Description,
                ThumbNail: null,
                PublishedDate: items.PublishedDate,
                ChannelID: items.ChannelID,
                VideoViews: items.VideoViews,
                ChannelName: items.ChannelName,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log("DONE")
                Refresh()
            }
        }))
    }

    function AddToWatchLater(items) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/AddWatchLater", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                _id: firebase.auth().currentUser.uid,
                Email: UserEmail,
                VidoeID: items.VidoeID,
                VideoTitle: items.VideoTitle,
                VideoURL: items.VideoURL,
                Description: items.Description,
                ThumbNail: null,
                PublishedDate: items.PublishedDate,
                ChannelID: items.ChannelID,
                VideoViews: items.VideoViews,
                ChannelName: items.ChannelName,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log("DONE")
                Refresh()
            }
        }))
    }


    function NavigateToVideoView() {

    }

    function NavigateToChannelView() {

    }

    return (
        <div>

            {/* header */}
            <Header UserPic={UserProfilePic} SidebarToggle={() => document.getElementById("SidebarID").style.display = "flex"} UserName={UserFirstName + " " + UserLastName} />

            <div style={{ display: "flex", flexDirection: "row", height: "100%", justifyContent: "center" }}>
                {/* Sidebar */}
                <div className="Gradient Sidebar" id="SidebarID" style={{ width: 230, height: '100%', position: "fixed", top: 0, left: 0, zIndex: 100 }}>
                    <ul>
                        <div onClick={() => document.getElementById("SidebarID").style.display = "none"} style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}>
                            <div style={{ borderRadius: 100, width: 40, height: 40, margin: 15, background: "lightblue", outline: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: 20 }} color="black" />
                            </div>
                        </div>
                        <li><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }} to={{ pathname: "/" }}>Home</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span>Subscription</a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>
                    </ul>
                </div>

                {/* Footer */}
                <div style={{ width: '60%', padding: 20 }}>

                    {isloading ? <div style={{ position: "absolute", top: "30%", left: "35%", zIndex: 100 }}>
                        <img src={loadingDataGif} width="350" />
                    </div> : null}

                    {!isloading && SpecificVideo.length ? SpecificVideo.map((items, i) => {
                        console.log(items)
                        return <div style={{ display: "flex", flexDirection: "column" }}>
                            <video style={{ width: '100%', height: 400 }} id="BigVideo" controls controlsList="nodownload">
                                <source src={items.VideoURL} />
                            </video>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", borderBottom: "1px solid lightgrey", paddingBottom: 10 }}>
                                <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                                    <h3 style={{ margin: 20, marginLeft: 0, fontFamily: "arial", fontWeight: "bold" }}>{items.VideoTitle}</h3>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        <small style={{ marginRight: 5, fontFamily: "sans-serif" }}>{items.VideoViews === 0 ? "No View  " : items.VideoViews}</small>
                                        <small>{" - " + " " + items.PublishedDate}</small>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", alignItems: "center" }}>
                                    <div onClick={() => LikeVideo(items)} style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 22 }} color={AlreadyLikedVideo ? "blue" : "grey"} /><span style={{ marginLeft: 5 }}>LIKE</span>
                                    </div>
                                    <div style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faShare} style={{ fontSize: 22 }} color="grey" /><span style={{ marginLeft: 5 }}>SHARE</span>
                                    </div>
                                    <div onClick={() => AddToWatchLater(items)} style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faClock} style={{ fontSize: 22 }} color={AlreadyWatchLaterVideo ? "blue" : "grey"} /><span style={{ marginLeft: 5 }}>LATER</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid lightgrey", height: 70, justifyContent: "space-between", width: "100%" }}>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                    <img src={items.ProfilePic} style={{ width: 55, height: 55, borderRadius: 100 }} />
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                                        <small style={{ color: "black", fontWeight: "700", fontSize: 16, fontFamily: "arial" }}>{items.ChannelName}</small>
                                        <small style={{ color: "grey" }}>{items.Followers + " " + "subscribers"}</small>
                                    </div>
                                </div>
                                {firebase.auth().currentUser.uid === items.OwnerID ? <div><Button variant="primary" style={{ height: 40, fontWeight: "500", borderRadius: 1 }}>ANALYTICS</Button><Button variant="primary" style={{ height: 40, fontWeight: "500", marginLeft: 10, borderRadius: 1 }}>EDIT VIDEO</Button></div> : <Button variant="danger" style={{ width: 120, height: 40, borderRadius: 1 }} className="Gradient">SUBSCRIBE</Button>}
                            </div>
                            <br />
                            <span style={{ fontSize: 18 }}>{items.Comments.length + "  " + "Comments"}</span>
                            <br />
                            <br />
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                <img src={UserProfilePic} style={{ width: 45, height: 45, borderRadius: 100, background: "white" }} />
                                <TextField value={comment} onChange={(e) => setComment(e.target.value)} id="standard-basic" fullWidth label="Add a public comment" style={{ width: "90%" }} />
                            </div>
                            <br />
                            <Button onClick={() => SendComment(items)} disabled={comment !== "" && comment !== undefined && comment !== "" ? false : true} variant="light" style={{ width: 100, background: "lightgrey", display: "flex", alignSelf: "flex-end", justifyContent: "center", alignItems: "center", marginRight: 10 }}>COMMENT</Button>

                            <br />
                            {items.Comments.length ? items.Comments.map((commentdata, index) => {
                                return <div style={{ marginTop: 10, minHeight: 100, borderBottom: ".5px solid lightgrey", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <img src={items.ProfilePic} style={{ width: 45, height: 45, borderRadius: 100, background: "white" }} />
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                                        <span style={{ color: "white", fontWeight: "400", fontSize: 11, fontFamily: "arial", padding: 2, paddingLeft: 5, paddingRight: 5, background: "grey", borderRadius: 10 }}>{commentdata.CommentBy_Name}</span>
                                        <small style={{ color: "black", marginTop: 7 }}>{commentdata.CommentMsg}</small>
                                    </div>
                                </div>
                            }) : null}

                        </div>
                    }) : null}
                </div>
                <div style={{ width: "30%", padding: 10, display: "flex", flexDirection: "column" }}>
                    {!isloading && AllVideos.length ? AllVideos.map((items, i) => {
                        if (items.VidoeID !== SpecificVideo[0].VidoeID) {
                            return <Link style={{ textDecoration: "none" }}><div onClick={() => { props.history.push('/v/:' + items.VidoeID); window.location.reload() }} style={{ width: "90%", marginTop: 10, padding: 5, display: "flex", flexDirection: "row" }}>
                                <video style={{ width: "50%", maxHeight: 100 }}>
                                    <source src={items.VideoURL} />
                                </video>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}>
                                    <b style={{ fontWeight: "500", color: "black", textDecoration: "none", fontFamily: "arial" }}>{items.VideoTitle}</b>
                                    <div onClick={() => NavigateToChannelView(items)}>
                                        <small style={{ color: "grey" }}>{items.ChannelName}</small>
                                    </div>
                                    <div style={{ marginTop: -3, display: "flex", flexDirection: "row", width: "90%" }}>
                                        <small style={{ color: "grey", textDecoration: "none", fontFamily: "sans-serif" }}>{items.VideoViews === 0 ? "No View  " : items.VideoViews}</small>
                                    </div>
                                </div>
                            </div></Link>
                        }
                    }) : null}



                </div>
            </div>

        </div >
    )
}


export default VideoView