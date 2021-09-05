import React, { useContext, useEffect, useState, useRef } from 'react';
import { faChevronDown, faArrowCircleDown, faBell, faVideo, faBookmark, faEnvelope, faHeart, faHome, faMap, faStoreAlt, faStream, faSubscript, faUsers, faUpload, faSignal, faWifi, faCalendarTimes, faList, faPlay, faPlayCircle, faTimesCircle, faClock, faTools, faThumbsUp, faShare, faAlignJustify, faCross, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Modal, Button, Dropdown } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';
import firebase from '../Config/FirebaseConfig';
import loadingDataGif from '../assets/loadingdata.gif';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../component/SocketContext';

const date = new Date();
const month = date.toLocaleString('default', { month: 'long' });
const TodayDate = date.getDate();
const TodayYear = date.getFullYear();

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


function LiveStreamingView(props) {

    const classes = useStyles();
    const { CreateOffer, BroadcasterVideo, JoinStream } = useContext(SocketContext);

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
    const [SpecificLiveStream, setSpecificLiveStream] = useState([]);

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
        console.log(props.match.params.StreamID)
        JoinStream(props.match.params.StreamID);

        document.getElementById("SidebarID").style.display = "none";
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
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getNowLiveStreamings")
                            .then(res => res.json())
                            .then(response => {
                                for (var i = 0; i < response.length; i++) {
                                    // console.log(response[i].VidoeID)
                                    console.log(props.match.params.StreamID)
                                    var x = props.match.params.StreamID;
                                    if (x.indexOf(':') !== -1) {
                                        //split and get
                                        var y = x.split(':')[1];
                                    }

                                    if (response[i].StreamID == y) {
                                        items.push(response[i])
                                    }
                                }
                            }).then(() => {
                                console.log(items)
                                setSpecificLiveStream(items)
                                fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllVideos")
                                    .then(res3 => res3.json())
                                    .then(response3 => {
                                        setAllVideos(response3)
                                        setIsloading(false)
                                    })
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
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getNowLiveStreamings")
                            .then(res => res.json())
                            .then(response => {
                                for (var i = 0; i < response.length; i++) {
                                    // console.log(response[i].VidoeID)
                                    console.log(props.match.params.StreamID)
                                    var x = props.match.params.StreamID;
                                    if (x.indexOf(':') !== -1) {
                                        //split and get
                                        var y = x.split(':')[1];
                                    }

                                    if (response[i].StreamID == y) {
                                        items.push(response[i])
                                    }
                                }
                            }).then(() => {
                                console.log(items)
                                setSpecificLiveStream(items)
                                fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllVideos")
                                    .then(res3 => res3.json())
                                    .then(response3 => {
                                        setAllVideos(response3)
                                    })
                            }).then(() => {

                            })
                    }
                }))
            }
            else {
            }
        })
    }


    function SendComment(items) {

    }

    function LikeVideo(items) {
    }

    function AddToWatchLater(items) {
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

                    {!isloading && SpecificLiveStream.length ? SpecificLiveStream.map((items, i) => {
                        console.log(items)
                        return <div style={{ display: "flex", flexDirection: "column" }}>
                            <video id="BigVideo" controls controlsList="nodownload" ref={BroadcasterVideo} autoPlay style={{ width: '100%', height: 400 }} />
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", borderBottom: "1px solid lightgrey", paddingBottom: 10 }}>
                                <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                                    <h3 style={{ margin: 20, marginLeft: 0, fontFamily: "arial", fontWeight: "bold" }}>{items.StreamTitle}</h3>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        <small style={{ marginRight: 5, fontFamily: "sans-serif" }}>{items.StreamLiveViewers === 0 ? "No View  " : items.StreamLiveViewers}</small>
                                        <small>{month + " " + TodayDate + " " + TodayYear}</small>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", alignItems: "center" }}>
                                    <div onClick={() => LikeVideo(items)} style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 22 }} color="grey" /><span style={{ marginLeft: 5 }}>LIKE</span>
                                    </div>
                                    <div style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faShare} style={{ fontSize: 22 }} color="grey" /><span style={{ marginLeft: 5 }}>SHARE</span>
                                    </div>
                                    <div onClick={() => AddToWatchLater(items)} style={{ margin: 5, cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faClock} style={{ fontSize: 22 }} color="grey" /><span style={{ marginLeft: 5 }}>LATER</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* <Button variant="primary" onClick={() => CallUser(items.StreamID)}>Request To Get Stream</Button> */}
                            <br />
                            {/* <Button variant="primary" onClick={() => GetCurrentStream()}>Accept Req</Button> */}

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
                            <br />
                            {/* {items.Comments.length ? items.Comments.map((commentdata, index) => {
                                return <div style={{ marginTop: 10, minHeight: 100, borderBottom: ".5px solid lightgrey", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <img src={items.ProfilePic} style={{ width: 45, height: 45, borderRadius: 100, background: "white" }} />
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                                        <span style={{ color: "white", fontWeight: "400", fontSize: 11, fontFamily: "arial", padding: 2, paddingLeft: 5, paddingRight: 5, background: "grey", borderRadius: 10 }}>{commentdata.CommentBy_Name}</span>
                                        <small style={{ color: "black", marginTop: 7 }}>{commentdata.CommentMsg}</small>
                                    </div>
                                </div>
                            }) : null}
                             */}
                        </div>
                    }) : null}
                </div>
                <div style={{ width: "30%", padding: 10, display: "flex", flexDirection: "column" }}>
                    {!isloading && AllVideos.length ? AllVideos.map((items, i) => {
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
                    }) : null}



                </div>
            </div>

        </div >
    )
}


export default LiveStreamingView;