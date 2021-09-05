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
import { Form, Modal, Dropdown, Button } from 'react-bootstrap';

function Subscription(props) {


    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();
    const [UserSubscriptions, setUserSubscriptions] = useState([]);


    const [AllChannels, setAllChannels] = useState([]);


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
                        // setUserSubscriptions(data.user[0].Subscriptions)

                        var items = []
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllChannels")
                            .then(res => res.json())
                            .then(response => {
                                if (data.user[0].Subscriptions.length) {
                                    for (var i = 0; i < response.length; i++) {
                                        console.log(response[i])
                                        for (var n = 0; n < data.user[0].Subscriptions.length; n++) {
                                            console.log(data.user[0].Subscriptions[n])
                                            if (response[i].ChannelID === data.user[0].Subscriptions[n].ChannelID) {
                                                items.push(response[i].PublicVideos)
                                            }
                                        }

                                    }
                                }
                                else {
                                    setAllChannels(response)
                                }
                            }).then(() => {

                                if (items.length) {
                                    console.log(items)
                                    setUserSubscriptions(items[0])
                                }
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
                        // setUserSubscriptions(data.user[0].Subscriptions)

                        var items = []
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllChannels")
                            .then(res => res.json())
                            .then(response => {
                                if (data.user[0].Subscriptions.length) {
                                    for (var i = 0; i < response.length; i++) {
                                        console.log(response[i])
                                        for (var n = 0; n < data.user[0].Subscriptions.length; n++) {
                                            console.log(data.user[0].Subscriptions[n])
                                            if (response[i].ChannelID === data.user[0].Subscriptions[n].ChannelID) {
                                                items.push(response[i].PublicVideos)
                                            }
                                        }

                                    }
                                }
                                else {
                                    setAllChannels(response)
                                }
                            }).then(() => {
                                if (items.length) {
                                    console.log(items)
                                    setUserSubscriptions(items[0])
                                }
                            })
                    }
                }))
            }
            else {
            }
        })
    }

    function NavigateToChannelView() {

    }

    function SubscribeChannel(data) {
        console.log(data)
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/Subscribe", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                _id: firebase.auth().currentUser.uid,
                ChannelID: data.ChannelID,
                ChannelName: data.ChannelName,
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
                        <li style={{ background: "linear-gradient(135deg, #ff516b 0%,#826cfd 100%)" }}><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/subscription" }} style={{ color: "white", textDecoration: "none" }}>Subscription</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/likeVideos" }} style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>
                    </ul>
                </div>
            </div>

            <div style={{ width: "80%", margin: "0 auto", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {!isloading && UserSubscriptions.length ? UserSubscriptions.map((items, index) => {
                    console.log(items)
                    return <Link to={{ pathname: '/v/:' + items.VidoeID, state: { VidoeID: items.VidoeID } }} style={{ textDecoration: "none", color: "black" }}><div style={{ display: "flex", cursor: "pointer", flexDirection: "column", width: 230, margin: 7, marginTop: 10, boxShadow: "0px 0px 12px 0px #ece4e4" }}>
                        <video style={{ width: 230, height: 150 }}>
                            <source src={items.VideoURL} />
                        </video>
                        <div style={{ display: "flex", flexDirection: "column", padding: 15, paddingLeft: 10, width: "100%", height: 120 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <img style={{ width: 30, height: 30, borderRadius: 100, background: "black", opacity: .7 }} />
                                <h6 style={{ marginLeft: 10, fontFamily: "arial" }}>{items.VideoTitle}</h6>
                            </div>
                            <div onClick={() => NavigateToChannelView(items)} style={{ marginLeft: 40, marginTop: -3 }}>
                                <small>{items.ChannelName}</small>
                            </div>
                            <div style={{ marginLeft: 40, marginTop: -3, display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <small>{items.VideoViews + " " + "Views"}</small>
                            </div>
                        </div>
                    </div>
                    </Link>
                })
                    : [!isloading && AllChannels.length ? AllChannels.map((data, i) => {
                        if (data.OwnerID !== userID) {
                            return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 25, marginTop: 15 }}>
                                <div style={{ width: 150, height: 180, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <img src={data.ProfilePic} style={{ width: 120, height: 120, borderRadius: 100 }} />
                                    <b style={{ fontWeight: "700", marginTop: 10, fontFamily: "arial", fontSize: 14 }}>{data.ChannelName}</b>
                                    <span style={{ fontSize: 13, color: "grey" }}>{data.Followers + " " + "Subscribers"}</span>
                                    <Button variant="light" style={{ background: "lightgrey", marginTop: 7 }} onClick={() => SubscribeChannel(data)}>SUBSCRIBE</Button>
                                </div>
                            </div>
                        }
                        if (AllChannels.length === 1) {
                            return <div style={{ position: "absolute", top: "40%", left: "40%", textAlign: "center" }}>
                                <img src={uploadVideoImage} style={{ width: 200, height: 200, borderRadius: 100 }} /><br />
                                <span style={{ fontSize: 14, color: "grey" }}>No content available</span>
                            </div>
                        }
                    }) : null]}
            </div>

        </div>
    )
}


export default Subscription;