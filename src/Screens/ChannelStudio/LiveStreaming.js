import React, { useState, useContext, useEffect, useRef } from 'react';
import { faAlignJustify, faArrowCircleDown, faCloudUploadAlt, faCommentAlt, faCog, faEnvelope, faFileVideo, faHome, faKey, faMap, faPlay, faPlayCircle, faSignOutAlt, faSubscript, faUsers, faVideo, faVideoSlash, faWifi } from '@fortawesome/free-solid-svg-icons'
import Video from 'twilio-video';
import logo from '../../assets/logo1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Dropdown, Modal, Button } from 'react-bootstrap';
import profilepic from '../../assets/profilepic.png';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
    Link, useHistory
} from "react-router-dom";
import firebase from '../../Config/FirebaseConfig';
import liveIcon from '../../assets/liveIcon.png';
import streamLoading from '../../assets/streamLoading.gif';
import { SocketContext } from '../../component/SocketContext';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
// const socket = io('https://halelujjahgospellivestreaming.herokuapp.com');


function LiveStreaming(props) {

    // const myVideo = useRef();
    let history = useHistory();
    const { myID, StartStream, myVideo, GetCurrentStream, currentStream } = useContext(SocketContext);

    const [show, setShow] = useState(true);
    const [SteamPreview, setSteamPreview] = useState(false);


    const [StreamThumbnail, setStreamThumbnail] = useState();

    const [desc, setDesc] = useState()
    const [title, setTitle] = useState()
    const [file, setFile] = useState(null);

    const [StreamingLoading, setStreamingLoading] = useState(false)
    const [isStartStreaming, setisStartStreaming] = useState(false);

    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();
    const [UserChannelName, setUserChannelName] = useState();
    const [UserChannelFollowers, setUserChannelFollowers] = useState();
    const [UserChannelProfilePic, setUserChannelProfilePic] = useState();

    // Channel State
    const [ChannelFollowers, setChannelFollowers] = useState();
    const [ChannelPublicVideos, setChannelPublicVideos] = useState([]);


    function SignOUT() {
        firebase.auth().signOut().then(() => {
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
    }

    const handleClose = () => {
        setShow(false);
        setSteamPreview(false)

    };



    function StartStreaming() {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/NowPublicStreaming", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                ChannelID: UserChannelID,
                OwnerID: userID,
                ChannelName: UserChannelName,
                Followers: UserChannelFollowers,
                ProfilePic: UserChannelProfilePic,
                StreamComments: 0,
                StreamID: myID,
                StreamData: currentStream,
                StreamTitle: title,
                StreamDesc: desc,
                StreamThumbnail: StreamThumbnail,
                StreamLiveViewers: 0,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log(data)
                setSteamPreview(false)
                setStreamingLoading(true);
                StartStream();
                setTimeout(function () {
                    setStreamingLoading(false);
                    setisStartStreaming(true);
                }, 3000);
                // history.push('/channel/ManageLiveStreaming')
            }
        }))
    }


    useEffect(() => {
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
                        GetCurrentStream();
                        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                        //     .then((currentStream) => {
                        //         setCurrentStream(currentStream);
                        //         myVideo.current.srcObject = currentStream;
                        //         // console.log("MY SOCKET ID", me)
                        //     })
                        setUserID(user.uid)
                        // setMe(SocketID)
                        data.user[0].ProfilePic && setUserProfilePic(data.user[0].ProfilePic)
                        setUserEmail(data.user[0].Email)
                        SetUserFirstName(data.user[0].FirstName)
                        setUserLastName(data.user[0].LastName)
                        setUserChannelID(data.user[0].ChannelID)

                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/GetChannelProfile", {
                            method: "POST",
                            headers: {
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ChannelID: data.user[0].ChannelID,
                                OwnerID: user.uid,
                                Email: data.user[0].Email
                            })
                        }).then(r2 => r2.json().then(data2 => {
                            if (!r2.ok) {
                                console.log(data2.message)
                            }
                            else {
                                console.log(data2.Channel[0].Followers)
                                setUserChannelName(data2.Channel[0].ChannelName)
                                setUserChannelFollowers(data2.Channel[0].Followers)
                                setUserChannelProfilePic(data2.Channel[0].ProfilePic)
                            }
                        }))

                    }
                }))
            }
            else {
            }
        })

    }, []);


    function SetupStream() {

        if (title !== "" && title !== undefined && desc !== "" && desc !== undefined && file !== null && file !== undefined) {

            // console.log(file)
            // setSteamPreview(true)
            // setShow(false)
            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }
            var rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

            firebase.storage().ref("Channels/" + UserChannelID).child("SchedulePrivateStreaming" + "/" + "Thumbnail" + "/" + rString).put(file)
                .then((result) => {
                    result.ref.getDownloadURL()
                        .then((url) => {

                            const date = new Date();
                            const month = date.toLocaleString('default', { month: 'long' });
                            const TodayDate = date.getDate();
                            const TodayYear = date.getFullYear();
                            let headers = new Headers();

                            headers.append('Content-Type', 'application/json');
                            headers.append('Accept', 'application/json');
                            headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

                            fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/SchedulePrivateStreaming", {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify({
                                    ChannelID: UserChannelID,
                                    StreamID: myID,
                                    StreamTitle: title,
                                    StreamDesc: desc,
                                    StreamThumbnail: url,
                                })
                            }).then(r => r.json().then(data => {
                                if (!r.ok) {
                                    console.log(data)
                                }
                                else {
                                    console.log(data)
                                    setShow(false)
                                    setStreamThumbnail(url)
                                    setSteamPreview(true)
                                }
                            }))
                        })
                })
        }
        else {
            alert("please fill fields first")
        }
    }

    function SaveLiveStreaming() {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/SchedulePrivateStreaming", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                ChannelID: UserChannelID,
                StreamID: myID,
                StreamTitle: title,
                StreamDesc: desc,
                StreamThumbnail: StreamThumbnail,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                console.log(data)
                history.push('/channel/ManageLiveStreaming')
            }
        }))
    }

    return <div>
        <div className="Gradient" style={{ width: "100%", height: 60, paddingLeft: 20, paddingRight: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ alignItems: "center", display: "flex" }}>
                <FontAwesomeIcon icon={faAlignJustify} style={{ marginRight: 15, cursor: "pointer", fontSize: 20 }} color="wheat" />
                <Link to="/home"><img src={logo} style={{ width: 90 }} alt="" /></Link>
            </div>

            <Dropdown style={{ marginRight: 10 }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: "none", width: 35, height: 35, display: "flex", borderRadius: 40, justifyContent: "center", alignItems: "center", background: "white" }}>
                    <img src={profilepic} style={{ width: 45, height: 45, borderRadius: 100, marginLeft: 15 }} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: 300, right: 300 }}>
                    <div style={{ padding: 10, width: "100%", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <img src={profilepic} style={{ width: 40, height: 40, borderRadius: 40 }} alt="" />
                        <b style={{ fontSize: 18, marginLeft: 20, fontWeight: "500" }}>Ahmed Raza</b>
                    </div>
                    <Dropdown.Item href="#">
                        <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 15, fontSize: 20 }} color="grey" />
                            <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>Your Channel</Link>
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                        <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                            <FontAwesomeIcon icon={faKey} style={{ marginRight: 15, fontSize: 20 }} color="grey" />
                            <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>Purchases and memberships</Link>
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                        <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                            <FontAwesomeIcon icon={faCog} style={{ marginRight: 15, fontSize: 20 }} color="grey" />
                            <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>Settings</Link>
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => SignOUT()}>
                        <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 15, fontSize: 20 }} color="grey" />
                            <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>SignOut</Link>
                        </span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div className="Gradient Sidebar" style={{ width: '17%', boxShadow: "1px 2px 4px 0px #e2dada", height: '100vh', display: "flex", flexDirection: "column" }}>
                <ul>
                    <li style={{ background: "linear-gradient(140deg, #ed8f5c 0%,#d6946f 90%)" }}><a><span><img src={liveIcon} style={{ width: 25 }} /></span><Link to={{ pathname: "/channel/liveStreaming" }} style={{ color: "white", textDecoration: "none", fontSize: 16, marginLeft: 10 }}>Stream</Link></a></li>
                    <li><a><span><FontAwesomeIcon icon={faCog} style={{ marginRight: 15, fontSize: 17 }} color="white" /></span><Link to={{ pathname: "/channel/ManageLiveStreaming" }} style={{ color: "white", textDecoration: "none", fontSize: 16 }}>Manage</Link></a></li>
                </ul>
            </div>
            <div style={{ width: isStartStreaming && !SteamPreview ? '63%' : '87%', height: "100vh", alignSelf: "center", display: "flex", justifyContent: "center", position: "relative" }}>
                {!isStartStreaming ? <div style={{ width: "100%", height: "100%", background: "rgb(171, 174, 180, .9)", zIndex: 99, position: "absolute" }}></div> : null}
                {!isStartStreaming && StreamingLoading ? <div style={{ width: "100%", height: "100%", zIndex: 100, position: "absolute", textAlign: "center" }}> <img src={streamLoading} /> <br /> <p>GOING LIVE</p></div> : null}
                <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%', height: "100%", zIndex: 98, position: "absolute" }} />
                {show ? <div style={{ margin: 15, width: 450, borderRadius: 5, height: "85%", background: "white", zIndex: 100, boxShadow: "#a78585 0px 0px 7px 0px" }}
                >
                    <Modal.Header>
                        <Modal.Title>Webcam stream info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                            <Form.Control type="name" placeholder="Create a title" onChange={(e) => setTitle(e.target.value)} />
                            <Form.Control type="name" placeholder="Add a description" style={{ marginTop: 20, height: 70 }} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <br />
                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                            <b>Thumbnail</b>
                            <small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small>
                            <label style={{ width: 120, background: "white", marginBottom: 20 }}>
                                <div style={{ background: "#edf2ef", marginTop: 10, cursor: "pointer", height: 100, width: 170, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: 19 }} color="grey" />
                                    <small>Upload thumbnail</small>
                                </div>
                                <input accept="image/*" type="file" name="myfile" style={{ display: "none" }} onChange={(file) => setFile(file.target.files[0])} />
                            </label>
                            <Button variant="primary" style={{ marginTop: 20, width: 200, height: 40, alignSelf: "center" }} onClick={() => SetupStream()}>NEXT</Button>
                        </div>
                    </Modal.Body>
                </div> : null}
                {SteamPreview ?
                    <div style={{ margin: 15, width: 400, borderRadius: 5, height: 540, marginTop: 10, background: "white", zIndex: 100, boxShadow: "#a78585 0px 0px 7px 0px" }}>
                        <Modal.Header className="Gradient" style={{ padding: 10, paddingRight: 15 }}>
                            <Modal.Title style={{ fontSize: 19, fontWeight: "bold", color: "white" }}>stream preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: 0 }}>
                            <div style={{ width: '100%' }}>
                                <img src={StreamThumbnail} style={{ width: "100%", height: 200 }} />
                                <br />
                                <div style={{ padding: 20, display: "flex", flexDirection: "column", background: "white" }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <small>Title</small>
                                            <b style={{ fontSize: 19, fontWeight: "bold" }}>{title}</b>
                                        </div>
                                        <Button variant="primary" style={{ height: 40, background: "transparent", borderRadius: 3, color: "#679aeb", borderWidth: 2, fontWeight: "bold" }}>EDIT</Button>
                                    </div>
                                    <br />
                                    <small>Description</small>
                                    <b style={{ fontSize: 19, fontWeight: "bold" }}>{desc}</b>
                                    <br />
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <small style={{ fontSize: 12 }}>Viewers Waiting</small>
                                            <b style={{ fontSize: 18, fontWeight: "bold" }}>0</b>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                                            <small style={{ fontSize: 12 }}>Likes</small>
                                            <b style={{ fontSize: 18, fontWeight: "bold" }}>0</b>
                                        </div>

                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", }}>
                                        <Button variant="primary" style={{ background: "transparent", marginTop: 20, marginRight: 20, height: 40, alignSelf: "center", color: "#679aeb", borderWidth: 2, fontWeight: "bold" }} onClick={() => StartStreaming()}>GO LIVE</Button>
                                        <Button variant="primary" style={{ background: "transparent", marginTop: 20, height: 40, alignSelf: "center", color: "#679aeb", borderWidth: 2, fontWeight: "bold" }} onClick={() => SaveLiveStreaming()}>SAVE</Button>
                                    </div>

                                </div>

                            </div>
                        </Modal.Body>
                    </div> : null}
            </div>

            {/* {SteamPreview ? <div className="Gradient" style={{ background: "grey", width: "20%", height: "100vh" }}>

            </div> : null} */}
        </div>

        {/* {show ? <div
            style={{ width: 300 }}
            show={show}
            size={"lg"}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton >
                <Modal.Title>Webcam stream info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <Form.Control type="name" placeholder="Create a title" onChange={(e) => setTitle(e.target.value)} />
                    <Form.Control type="name" placeholder="Add a description" style={{ marginTop: 20, height: 80 }} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <br />
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <b>Thumbnail</b>
                    <small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small>
                    <label style={{ width: 120, background: "snow", marginBottom: 20 }}>
                        <div style={{ background: "#edf2ef", marginTop: 10, cursor: "pointer", height: 100, width: 170, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: 19 }} color="grey" />
                            <small>Upload thumbnail</small>
                        </div>
                        <input accept="image/*" type="file" name="myfile" style={{ display: "none" }} onChange={(file) => setFile(file.target.files[0])} />
                    </label>
                    <Button variant="primary" style={{ marginTop: 20, width: 200, height: 40, alignSelf: "center" }} onClick={() => SetupStream()}>NEXT</Button>
                </div>
            </Modal.Body>
        </div> : null} */}

    </div>
}

export default LiveStreaming;



{/* <Modal
                        show={SteamPreview}
                        // size={"sm"}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header className="Gradient" style={{ padding: 10, paddingRight: 15 }}>
                            <Modal.Title style={{ fontSize: 19, fontWeight: "bold", color: "white" }}>stream preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: 0 }}>
                            <div style={{ width: '100%' }}>
                                <img src={StreamThumbnail} style={{ width: "100%", height: 200 }} />
                                <br />
                                <div style={{ padding: 20, display: "flex", flexDirection: "column", background: "white", height: 300 }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <small>Title</small>
                                            <b style={{ fontSize: 19, fontWeight: "bold" }}>{title}</b>
                                        </div>
                                        <Button variant="primary" style={{ height: 40, background: "transparent", borderRadius: 3, color: "#679aeb", borderWidth: 2, fontWeight: "bold" }}>EDIT</Button>
                                    </div>
                                    <br />
                                    <small>Description</small>
                                    <b style={{ fontSize: 19, fontWeight: "bold" }}>{desc}</b>
                                    <br />
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <small style={{ fontSize: 12 }}>Viewers Waiting</small>
                                            <b style={{ fontSize: 18, fontWeight: "bold" }}>0</b>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                                            <small style={{ fontSize: 12 }}>Likes</small>
                                            <b style={{ fontSize: 18, fontWeight: "bold" }}>0</b>
                                        </div>

                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", }}>
                                        <Button variant="primary" style={{ background: "transparent", marginTop: 20, marginRight: 20, height: 40, alignSelf: "center", color: "#679aeb", borderWidth: 2, fontWeight: "bold" }} >GO LIVE</Button>
                                        <Button variant="primary" style={{ background: "transparent", marginTop: 20, height: 40, alignSelf: "center", color: "#679aeb", borderWidth: 2, fontWeight: "bold" }} >SAVE</Button>
                                    </div>

                                </div>

                            </div>
                        </Modal.Body>
                    </Modal> */}