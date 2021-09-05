import React, { useContext, useEffect, useState, useRef } from 'react';
import { faHeart, faHome, faStream, faSubscript, faPlay, faPlayCircle, faTimesCircle, faClock, faTools, faThumbsUp, faShare, faAlignJustify, faCross, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo1.gif';
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';
import firebase from '../Config/FirebaseConfig';
import loadingDataGif from '../assets/loadingdata.gif';
import uploadVideoImage from '../assets/uploadVideoImage.svg';
import { Form, Modal, Button, Dropdown } from 'react-bootstrap';

function LikeVideos(props) {


    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();
    const [UserLikeVideos, setUserLikedVideos] = useState([])

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
                        setUserLikedVideos(data.user[0].LikedVideos)
                        setIsloading(false)
                        // setUserSubscriptions(data.user[0].Subscriptions)
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
                        setUserLikedVideos(data.user[0].LikedVideos)
                        // setUserSubscriptions(data.user[0].Subscriptions)
                    }
                }))
            }
            else {
            }
        })
    }


    function NavigateToChannelView() {

    }

    function RemoveFromLike(items) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/UNLikeVideo", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                _id: firebase.auth().currentUser.uid,
                Email: UserEmail,
                VidoeID: items.VidoeID,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log("DONE")
                alert("Video is removed From Like Videos")
                Refresh()
            }
        }))
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
                        <li><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/" }} style={{ color: "white", textDecoration: "none" }}>Home</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/subscription" }} style={{ color: "white", textDecoration: "none" }}>Subscription</Link></a></li>
                        <li style={{ background: "linear-gradient(135deg, #ff516b 0%,#826cfd 100%)" }}><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/likeVideos" }} style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>
                    </ul>
                </div>
            </div>

            <div style={{ width: "90%", margin: "0 auto", display: "flex", flexDirection: "column", padding: 30 }}>
                {!isloading && UserLikeVideos.length ? UserLikeVideos.map((items, i) => {
                    return <div style={{ display: "flex", cursor: "pointer", flexDirection: "row", width: "80%", margin: 7, marginTop: 15 }}>
                        <Link to={{ pathname: '/v/:' + items.VidoeID, state: { VidoeID: items.VidoeID } }} style={{ textDecoration: "none", color: "black" }}>
                            <video style={{ width: 350, height: 200 }}>
                                <source src={items.VideoURL} />
                            </video>
                        </Link>
                        <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
                            <Link to={{ pathname: '/v/:' + items.VidoeID, state: { VidoeID: items.VidoeID } }} style={{ textDecoration: "none", color: "black" }}>
                                <h5 style={{ fontFamily: "arial" }}>{items.VideoTitle}</h5>
                                <div style={{ marginTop: -3, display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                    <small>{items.VideoViews + " " + "Views"}</small>
                                    <small style={{ marginLeft: 10 }}>{items.PublishedDate}</small>
                                </div>
                                <div onClick={() => NavigateToChannelView(items)} style={{ marginTop: 10 }}>
                                    <small>{items.ChannelName}</small>
                                </div>
                                <p style={{ margin: 10, fontSize: 13, marginTop: 15 }}>{items.Description}</p>
                            </Link>
                            <Button variant="danger" onClick={() => RemoveFromLike(items)} style={{ background: "#962c45", display: "flex", width: 220, justifyContent: "center", alignItems: "center", marginRight: 10 }}>REMOVE FROM LIKE VIDEO</Button>
                        </div>
                    </div>
                }) : <div style={{ position: "absolute", top: "40%", left: "40%", textAlign: "center" }}>
                    <img src={uploadVideoImage} style={{ width: 200, height: 200, borderRadius: 100 }} /><br />
                    <span style={{ fontSize: 14, color: "grey" }}>No content available</span>
                </div>}
            </div>

        </div >
    )
}

{/* 
                        <div style={{ display: "flex", flexDirection: "column", padding: 15, paddingLeft: 10, width: "100%", height: 120 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <img src={items.ProfilePic} style={{ width: 30, height: 30, borderRadius: 30, opacity: .7 }} />
                                <h6 style={{ marginLeft: 10, fontFamily: "arial" }}>{items.VideoTitle}</h6>
                            </div>
                            <div onClick={() => NavigateToChannelView(items)} style={{ marginLeft: 40, marginTop: -3 }}>
                                <small>{items.ChannelName}</small>
                            </div>
                            <div style={{ marginLeft: 40, marginTop: -3, display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <small>{items.VideoViews + " " + "Views"}</small>
                            </div>
                        </div> */}


export default LikeVideos;