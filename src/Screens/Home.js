import React, { useContext, useEffect, useState, useRef } from 'react';
import { faChevronDown, faArrowCircleDown, faBell, faBookmark, faEnvelope, faHeart, faHome, faMap, faStoreAlt, faStream, faSubscript, faUsers, faUpload, faSignal, faWifi, faCalendarTimes, faList, faPlay, faPlayCircle, faTimesCircle, faClock, faTools, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo1.gif';
import { Form, Modal, Button } from 'react-bootstrap';
import android from '../assets/android.png';
import ios from '../assets/ios.png';
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';
import { SocketContext } from '../component/SocketContext';
import firebase from '../Config/FirebaseConfig';
import { Redirect } from 'react-router'
import { faGooglePlay, faPlaystation } from '@fortawesome/free-brands-svg-icons';
import loadingDataGif from '../assets/loadingdata.gif';

function HomeScreen() {

    const [stream, setStream] = useState(null)
    const { myID } = useContext(SocketContext);

    const [IsChannel, SetIsChannel] = useState(null);
    const [UserChannel, SetUserChannel] = useState(null);
    const [dataFetched, SetdataFetched] = useState(null);
    const [show, setShow] = useState(false);
    const [DesciptionModal, setDescription] = useState(false);
    const [desc, setDesc] = useState()
    const [title, setTitle] = useState()
    const [ReadyForLive, setReady] = useState(false);

    const [AllVideos, setAllVideos] = useState([]);
    const [LiveStreamings, setLiveStreamings] = useState([]);



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

                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getAllVideos")
                            .then(res => res.json())
                            .then(response => {
                                setAllVideos(response)
                                console.log("BROADCASTER ID FROM HOME", myID)
                                fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/getNowLiveStreamings")
                                    .then(res2 => res2.json())
                                    .then(response2 => {
                                        setLiveStreamings(response2)
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

    const handleClose = () => {
        setShow(false);
        setDescription(false)
    };

    const StartStreaming = () => {
        // if (stream) {
        // }
        // else {
        //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //         .then((currentStream) => {
        //             setStream(currentStream);

        //             myVideo.current.srcObject = currentStream;
        //         });
        // }
    }

    function NavigateToVideoView() {

    }

    function NavigateToChannelView() {

    }

    return (
        <div>

            {/* header */}
            <Header UserPic={UserProfilePic} SidebarToggle={() => document.getElementById("SidebarID").style.display = "flex"} UserName={UserFirstName + " " + UserLastName} />

            <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
                {/* Sidebar */}
                <div className="Gradient Sidebar" id="SidebarID" style={{ width: 230, height: '100%', position: "fixed", top: 0, zIndex: 100 }}>
                    <ul>
                        <div onClick={() => document.getElementById("SidebarID").style.display = "none"} style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}>
                            <div style={{ borderRadius: 100, width: 40, height: 40, margin: 15, background: "lightblue", outline: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: 20 }} color="black" />
                            </div>
                        </div>
                        <li style={{ background: "linear-gradient(135deg, #ff516b 0%,#826cfd 100%)" }}><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/" }} style={{ color: "white", textDecoration: "none" }}>Home</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/subscription" }} style={{ color: "white", textDecoration: "none" }}>Subscription</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/likeVideos" }} style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/WatchLater" }} style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>
                    </ul>
                </div>
                {/* <div className="Gradient Sidebar" style={{ width: '17%', height: '100%' }}>
                    <ul>
                        <li><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span>Home</a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span>Subscription</a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>

                    </ul>
                </div> */}


                {/* Footer */}
                <div style={{ width: '100%', }}>

                    {isloading ? <div style={{ position: "absolute", top: "30%", left: "35%", zIndex: 100 }}>
                        <img src={loadingDataGif} width="350" />
                    </div> : null}
                    <br />
                    <p>Now Streamings</p>
                    <div className="AllVideosParentDiv_HOME" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 auto" }}>
                        {!isloading && LiveStreamings.length ? LiveStreamings.map((items1, index) => {
                            var count1 = 13;

                            var StreamTitle = items1.StreamTitle.slice(0, count1) + (items1.StreamTitle.length > count1 ? "..." : "");
                            var ChannelName = items1.ChannelName.slice(0, count1) + (items1.ChannelName.length > count1 ? "..." : "");
                            return <Link to={{ pathname: '/Live/:' + items1.StreamID }} style={{ textDecoration: "none", color: "black" }}><div className="ViewViewDiv_HOME" style={{ display: "flex", cursor: "pointer", flexDirection: "column", margin: 7, marginTop: 10, boxShadow: "0px 0px 12px 0px #ece4e4" }}>
                                <img style={{ width: "100%", height: 150 }} src={items1.StreamThumbnail} />
                                <div style={{ display: "flex", flexDirection: "column", padding: 15, paddingLeft: 10, width: "100%", height: 120 }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                        <img src={items1.ProfilePic} style={{ width: 30, height: 30, borderRadius: 30, opacity: .7 }} />
                                        <h6 style={{ marginLeft: 10, fontFamily: "arial" }}>{StreamTitle}</h6>
                                    </div>
                                    <div onClick={() => NavigateToChannelView(items1)} style={{ marginLeft: 40, marginTop: -3 }}>
                                        <small>{ChannelName}</small>
                                    </div>
                                    <div style={{ marginLeft: 40, marginTop: -3, display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                        <small>{items1.StreamLiveViewers + " " + "Views"}</small>
                                    </div>
                                </div>

                            </div>
                            </Link>

                        }) : null}
                    </div>
                    <br />
                    <div className="AllVideosParentDiv_HOME" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 auto" }}>

                        {!isloading && AllVideos.length ? AllVideos.map((items, i) => {
                            console.log(items)
                            var count = 13;

                            var VideoTitle = items.VideoTitle.slice(0, count) + (items.VideoTitle.length > count ? "..." : "");
                            var ChannelName = items.ChannelName.slice(0, count) + (items.ChannelName.length > count ? "..." : "");

                            return <Link to={{ pathname: '/v/:' + items.VidoeID, state: { VidoeID: items.VidoeID } }} style={{ textDecoration: "none", color: "black" }}><div className="ViewViewDiv_HOME" style={{ display: "flex", cursor: "pointer", flexDirection: "column", margin: 7, marginTop: 10, boxShadow: "0px 0px 12px 0px #ece4e4" }}>
                                <video style={{ width: "100%", height: 150 }}>
                                    <source src={items.VideoURL} />
                                </video>
                                <div style={{ display: "flex", flexDirection: "column", padding: 15, paddingLeft: 10, width: "100%", height: 120 }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                        <img src={items.ProfilePic} style={{ width: 30, height: 30, borderRadius: 30, opacity: .7 }} />
                                        <h6 style={{ marginLeft: 10, fontFamily: "arial" }}>{VideoTitle}</h6>
                                    </div>
                                    <div onClick={() => NavigateToChannelView(items)} style={{ marginLeft: 40, marginTop: -3 }}>
                                        <small>{ChannelName}</small>
                                    </div>
                                    <div style={{ marginLeft: 40, marginTop: -3, display: "flex", flexDirection: "row", alignItems: "center", width: "90%" }}>
                                        <small>{items.VideoViews + " " + "Views"}</small>
                                    </div>
                                </div>

                            </div>
                            </Link>
                        }) : null}
                    </div>




                    <div className="Footer">
                        <div style={{ width: "20%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <img src={logo} style={{ width: 90 }} alt="" />

                            <p style={{ marginTop: 50, color: "#666", fontSize: 13 }}>86 Petersham town, New South wales Waedll Steet, Australia</p>
                            <ul>
                                <li><a><span><FontAwesomeIcon icon={faBookmark} style={{ marginRight: 5 }} color="black" /></span>+61 525 240 310</a></li>
                                <li><a><span><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 5 }} color="black" /></span>[email protected]</a></li>
                                <li><a><span><FontAwesomeIcon icon={faArrowCircleDown} style={{ marginRight: 5 }} color="black" /></span>www.ScubeTech.com</a></li>
                            </ul>
                        </div>
                        <div style={{ maxWidth: "20%" }}>
                            <p>Company</p>
                            <ul>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Legal</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Contact us</a></li>
                            </ul>
                        </div>
                        <div style={{ maxWidth: "20%" }}>
                            <p>Features</p>
                            <ul>
                                <li><a href="#">Retention</a></li>
                                <li><a href="#">Prople</a></li>
                                <li><a href="#">Messages</a></li>
                                <li><a href="#">Infrastructure</a></li>
                                <li><a href="#">Platforms</a></li>
                                <li><a href="#">Funnels</a></li>
                                <li><a href="#">Live</a></li>
                            </ul>
                        </div>
                        <div style={{ maxWidth: "20%" }}>
                            <p>Solutions</p>
                            <ul>
                                <li><a href="#">Enterprise</a></li>
                                <li><a href="#">Financial Services</a></li>
                                <li><a href="#">Consumer Tech</a></li>
                                <li><a href="#">Entertainment</a></li>
                                <li><a href="#">Product</a></li>
                                <li><a href="#">Marketing</a></li>
                                <li><a href="#">Analysis</a></li>
                            </ul>
                        </div>
                        <div style={{ maxWidth: "20%", fontSize: 13 }}>
                            <small>It is a long established fact that a reader will be distracted by..</small>

                            <h6 style={{ marginTop: 30 }}>DOWNLOAD APP</h6>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={android} style={{ width: 70, marginRight: 5 }} alt="" />
                                <img src={ios} style={{ width: 70 }} alt="" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {show ? <Modal
                show={show}
                size={"lg"}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>Welcome to the New Live Control Room.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        <div style={{ background: "#ebdbda", width: '100%', padding: 15, alignItems: "center" }}>
                            <p style={{ fontWeight: "bold" }}>Right Now</p>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <FontAwesomeIcon icon={faStream} style={{ marginRight: 5 }} color="black" />
                                <div style={{ width: "80%", textAlign: "left" }}>
                                    <small style={{ fontSize: 16 }}>Get set up live streaming now. Don't worry you will have a chance to review setting before live</small>
                                </div>
                                <Button onClick={() => { setDescription(true); setShow(false) }} variant="primary">START</Button>
                            </div>
                        </div>
                        <div style={{ background: "#ebdbda", width: '100%', padding: 15, marginTop: 10 }}>
                            <p style={{ fontWeight: "bold" }}>Later Date</p>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <FontAwesomeIcon icon={faCalendarTimes} style={{ marginRight: 5 }} color="black" />
                                <div style={{ width: "80%", textAlign: "left" }}>
                                    <small style={{ fontSize: 17 }}>Schedule a stream for a Later time. You can even set it up ahead of time</small>
                                </div>
                                <Button variant="primary">START</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> : null}

            {DesciptionModal ? <Modal
                show={DesciptionModal}
                size={"lg"}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Webcam stream info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        <Form.Control type="name" placeholder="Create a title" onChange={(e) => setTitle(e.target.value)} />
                        <Form.Control type="name" placeholder="Add a description" style={{ marginTop: 20 }} onChange={(e) => setDesc(e.target.value)} />
                        <Button variant="primary" style={{ marginTop: 20 }} onClick={() => StartStreaming()}>START STREAMING</Button>

                    </div>
                    {/* <Form.Control as="select" defaultValue="Choose..." style={{ marginTop: 20 }}>
                        <option>Public</option>
                        <option>Private</option>
                    </Form.Control> */}
                </Modal.Body>
            </Modal> : null}
            {ReadyForLive && <Redirect to="/Live" push={true} />}

        </div >
    )
}


export default HomeScreen