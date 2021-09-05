import React, { useState, useEffect } from 'react';
import '../../css/Main-channel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faVideo, faPlay, faWifi, faUserCircle, faCog, faSignOutAlt, faKey, faHome, faStream, faSubscript, faHeart, faPlayCircle, faTools, faThList, faChartBar, faCommentAlt, faExclamationTriangle, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import {
    Link
} from "react-router-dom";
import logo from '../../assets/logo1.gif';
import { Form, Modal, Dropdown, Button } from 'react-bootstrap';
import profilepic from '../../assets/profilepic.png';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import uploadIcon from '../../assets/uploadIcon.png';
import liveIcon from '../../assets/liveIcon.png';
import firebase from '../../Config/FirebaseConfig';
import loadingGif from '../../assets/loading.gif';
import uploadVideoImage from '../../assets/uploadVideoImage.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import loadingDataGif from '../../assets/loadingdata.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

function ChannelDashboard() {

    const classes = useStyles();
    const [show, SetModal] = useState(false);
    const [VideoDetailModal, SetVideoDetailModal] = useState(false);


    const [isImage, setIsImage] = useState()
    const [isUploading, setIsUploading] = useState()
    const [file, setFile] = useState(null);
    const [FileName, setFileName] = useState(null);
    const [FileTitle, setVideoTitle] = useState(null);

    const [FileType, setFileType] = useState(null);
    const [VideoID, setVideoID] = useState(null);

    const [UploadingVideoTitle, setUploadingVideoTitle] = useState("");
    const [UploadingVideoDesp, setUploadingVideoDesp] = useState("");


    const [isThumbNail, setIsThumbNail] = useState()
    const [ThumbNailURI, setThumbNailURI] = useState()

    const [url, setURL] = useState("");


    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();

    // Channel State
    const [ChannelFollowers, setChannelFollowers] = useState();
    const [ChannelPublicVideos, setChannelPublicVideos] = useState([]);

    const handleClose = () => {
        SetModal(false)
    }

    function getFileType(file) {


        if (file.target.files[0].type.match('video.*')) {
            console.log(file.target.files[0].type)
            setIsImage(false)
            setIsUploading(true)
            setFileType(file.target.files[0].type)
            setFile(file.target.files[0]);
            console.log(file.target.files[0].name)
            var VideoTitle = file.target.files[0].name.split('.').slice(0, -1).join('.')
            setVideoTitle(VideoTitle)
            setUploadingVideoTitle(VideoTitle)
            var fileName = file.target.files[0].name;
            setFileName(fileName)

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }
            var rString = randomString(11, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            // console.log(onlyname)
            // var VidoeID = Math.floor(1000000 + Math.random() * 5000000)
            firebase.storage().ref("Channels/" + UserChannelID).child("UploadedVideos" + "/" + rString).put(file.target.files[0])
                .then((result) => {
                    result.ref.getDownloadURL()
                        .then((url) => {
                            let headers = new Headers();

                            headers.append('Content-Type', 'application/json');
                            headers.append('Accept', 'application/json');
                            headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

                            fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/UploadVideoOnDraft", {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify({
                                    OwnerID: userID,
                                    ChannelID: UserChannelID,
                                    Email: UserEmail,
                                    VidoeID: rString,
                                    VideoTitle: VideoTitle,
                                    VideoURL: url,
                                    FileName: fileName,
                                })
                            }).then(r => r.json().then(data => {
                                if (!r.ok) {
                                    console.log(data)
                                }
                                else {
                                    console.log(data)
                                    setURL(url)
                                    setVideoID(rString)
                                    setIsUploading(false)
                                    SetModal(false)
                                    SetVideoDetailModal(true)
                                }
                            }))
                        })
                })
        }
        else {
            setIsImage(true)
        }

        // // if (file.target.files[0].type.match('audio.*'))
        // //     return console.log("audio")

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
                        setUserID(user.uid)
                        data.user[0].ProfilePic && setUserProfilePic(data.user[0].ProfilePic)
                        setUserEmail(data.user[0].Email)
                        SetUserFirstName(data.user[0].FirstName)
                        setUserLastName(data.user[0].LastName)
                        setUserChannelID(data.user[0].ChannelID)

                        var arr = []
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
                                if (data2.Channel[0].PublicVideos.length) {
                                    arr.push(data2.Channel[0].PublicVideos.slice(-1)[0])
                                    setChannelFollowers(data2.Channel[0].Followers)
                                }
                            }
                        })).then(() => {
                            setChannelPublicVideos(arr)
                        })
                    }
                }))
            }
            else {
            }
        })
    }, [])

    function UploadThumbNail(e) {
    }

    function handleVideoTitle(e) {
        setUploadingVideoTitle(e.target.value)
    }

    function handleVideoDesp(e) {
        setUploadingVideoDesp(e.target.value)
    }

    function SaveAsDraft() {
        setIsUploading(true)
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000/ChannelDashboard');

        fetch("https://halelujjahgospellivestreaming.herokuapp.com/channel/UploadVideoOnDraft", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                OwnerID: userID,
                ChannelID: UserChannelID,
                Email: UserEmail,
                VidoeID: VideoID,
                VideoTitle: UploadingVideoTitle,
                Description: UploadingVideoDesp ? UploadingVideoDesp : null,
                VideoURL: url,
                FileName: FileName,
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                console.log(data)
            }
            else {
                setIsUploading(false)
                SetModal(false)
                SetVideoDetailModal(false)
            }
        }))
    }


    return (
        <div >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 15, paddingRight: 20, paddingLeft: 20, background: "white", boxShadow: "#eae7e7 0px 0px 2px 2px" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {/* <FontAwesomeIcon icon={faAlignJustify} style={{ marginRight: 25, fontSize: 20 }} color="grey" /> */}
                    <Link to="/home"><img src={logo} style={{ width: 110 }} alt="" /></Link>
                </div>
                <Form.Control type="email" placeholder="Search for" style={{ width: '40%', height: 35, borderRadius: 3, border: '.5px solid lightgrey' }} />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "15%" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "white" }}>
                            <FontAwesomeIcon icon={faVideo} style={{ fontSize: 18, cursor: "pointer" }} color="red" />
                            <span style={{ color: "black", marginLeft: 10 }}>CREATE</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item href="#" onClick={() => SetModal(true)}>
                                <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                    <img src={uploadIcon} style={{ width: 20 }} />
                                    <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>Upload Video</Link>
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" >
                                <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                    <img src={liveIcon} style={{ width: 25 }} />
                                    <Link style={{ color: "black", textDecoration: "none", marginLeft: 10 }}>Go Live</Link>
                                </span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown style={{ marginRight: 10 }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: "none", width: 35, height: 35, display: "flex", borderRadius: 40, justifyContent: "center", alignItems: "center", background: "white" }}>
                            <img src={UserProfilePic} style={{ width: 40, height: 40, borderRadius: 40, marginLeft: 15 }} alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: 300, right: 300 }}>
                            <div style={{ padding: 10, width: "100%", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", flexDirection: "row" }}>
                                <img src={UserProfilePic} style={{ width: 40, height: 40, borderRadius: 40 }} alt="" />
                                <b style={{ fontSize: 18, marginLeft: 20, fontWeight: "500" }}>{UserFirstName + " " + UserLastName}</b>
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
                            <Dropdown.Item href="#">
                                <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 15, fontSize: 20 }} color="grey" />
                                    <Link style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>SignOut</Link>
                                </span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* Sidebar */}

            <div style={{ display: "flex", flexDirection: "row" }}>

                <div className="Sidebar" style={{ width: '18%', boxShadow: "1px 2px 4px 0px #e2dada", height: '100vh', display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: 25, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <img src={UserProfilePic} style={{ width: 110, height: 110, borderRadius: 100, marginBottom: 20 }} alt="" />
                        <b style={{ fontSize: 14, color: "black" }}>Your channel</b>
                        <p style={{ color: "grey" }}>{UserFirstName + " " + UserLastName}</p>
                    </div>

                    <ul>
                        <li style={{ background: "linear-gradient(135deg, #ff516b 0%,#826cfd 100%)" }}><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 12, fontSize: 17 }} color="white" /></span><Link to={{ pathname: "/ChannelDashboard" }} style={{ color: "white", textDecoration: "none", fontSize: 16 }}>Dashboard</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlayCircle} style={{ marginRight: 15, fontSize: 17 }} color="grey" /></span><Link to={{ pathname: "/ChannelContent" }} style={{ color: "grey", fontSize: 16, textDecoration: "none" }}>Content</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faCommentAlt} style={{ marginRight: 15, fontSize: 17 }} color="grey" /></span><Link to={{ pathname: "/ChannelComments" }} style={{ color: "grey", textDecoration: "none", fontSize: 16 }}>Comments</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faCog} style={{ marginRight: 15, fontSize: 17 }} color="grey" /></span><Link style={{ color: "grey", textDecoration: "none", fontSize: 16 }}>Settings</Link></a></li>
                    </ul>

                </div>

                {/* Main Content */}
                <div style={{ width: "82%", height: "100vh", padding: 20 }}>
                    <h4>Channel Dashboard</h4>
                    <br />
                    <div style={{ width: "100%", height: '100vh', display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <div style={{ width: 330, height: 520, borderRadius: 3, padding: 25, background: "white", boxShadow: "#e8e0e0 0px 0px 8px 0px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            {!isUploading && ChannelPublicVideos.length ? ChannelPublicVideos.map((items, i) => {
                                return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h5 style={{ margin: 10 }}>Last video performance</h5>
                                    <video width="290">
                                        <source src={items.VideoURL} type="video/mp4" />
                                    </video>
                                    <br />
                                    <span>{items.PublishedDate}</span>
                                    <br />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <span>Views</span>
                                        <span>{items.VideoViews}</span>
                                    </div>
                                    <br />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <span>Comments</span>
                                        <span>{items.Comments.length}</span>
                                    </div>
                                    <br />
                                    <br />
                                    <Button variant="light" style={{ background: "lightgrey" }}>GO TO VIEW ANALYTICS</Button>
                                    <Button variant="light" style={{ background: "lightgrey", marginTop: 7 }}>SEE COMMENTS</Button>
                                </div>
                            }) : <div><img src={uploadVideoImage} style={{ width: 170, height: 170, borderRadius: 100 }} />
                                <p style={{ fontSize: 13, textAlign: "center" }}>Want to see metrics on your recent video?
                                    Upload and publish a video to get started.</p>
                                <Button variant="primary" style={{ marginTop: 10 }} onClick={() => SetModal(true)}>UPLOAD VIDEO</Button>
                            </div>
                            }
                        </div>

                        <div style={{ width: 300, height: 520, padding: 15, borderRadius: 3, background: "white", boxShadow: "#e8e0e0 0px 0px 8px 0px", display: "flex", flexDirection: "column" }}>
                            <h5>Channel analytics</h5>
                            <p style={{ fontSize: 13, marginTop: 10 }}>Current subscribers</p>
                            <h2>{ChannelFollowers}</h2>

                            <br />
                            <br />
                            <div style={{ borderTop: ".5px solid lightgrey", paddingTop: 8, borderBottom: ".5px solid lightgrey", paddingBottom: 10, width: '100%', display: "flex", flexDirection: "column" }}>
                                <b>Summary</b>
                                <small>Last 28 days</small>

                                <div style={{ display: "flex", marginTop: 5, flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                    <small>Views</small>
                                    <small>0</small>
                                </div>
                            </div>
                            {/* <br /> */}
                            <div style={{ paddingTop: 8, paddingBottom: 10, width: '100%', display: "flex", flexDirection: "column" }}>
                                <b>Top Videos</b>
                                <small>Last 48 hours - Views</small>

                                <div style={{ display: "flex", marginTop: 5, flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                    <small>Views</small>
                                    <small>0</small>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div style={{ width: 300, height: 300, display: "flex", flexDirection: "column", background: "white", padding: 15, boxShadow: "#e8e0e0 0px 0px 8px 0px" }}>
                            <h5>What's new in this Project</h5>
                            <div style={{ padding: 5, marginTop: 10 }}>
                                <p>1. Faster upload videos on channel</p>
                            </div>
                            <div style={{ padding: 5 }}>
                                <p>2. Customize your channel</p>
                            </div>
                            <div style={{ padding: 5 }}>
                                <p>3. Much More...</p>
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
                animation={false}
                // keyboard={false}
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>Upload Videos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 350 }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ width: 130, height: 130, borderRadius: 100, background: "#f5f0ed", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={isUploading ? loadingGif : uploadIcon} style={{ width: 130, borderRadius: 100 }} />
                            </div>
                            <b style={{ fontWeight: "500", fontSize: 15, marginTop: 10 }}>Select files to upload</b>
                            <small style={{ fontSize: 13, marginTop: 5 }}>Your videos will be private until you publish them.</small>

                            <label style={{ height: 40, width: 120, borderRadius: 5, cursor: isUploading ? "wait" : "pointer", background: isUploading ? "grey" : "#3770cc", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop: 30 }}>
                                <input disabled={isUploading ? true : false} type="file" multiple={false} onChange={(file) => getFileType(file)} name="myfile" style={{ width: 30, height: 40, display: "none" }} />
                                <b style={{ color: "white", fontWeight: "400" }}>SELECT FILE</b>
                            </label>

                            {isImage ? <span style={{ display: "flex", flexDirection: "row" }}><FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: 20 }} color="red" /><small>Invalid file format. Only video file can be uploaded</small></span> : null}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "90%" }}>
                        <p style={{ fontSize: 12, textAlign: "center" }}>By submitting your videos to Hallelujah Gospel, you acknowledge that you agree to Hallelujah Gospel Terms of Service and Community Guidelines.</p>
                        {/* <small style={{ fontSize: 12, marginTop: -10 }}>Please be sure not to violate others' copyright or privacy rights. Learn more</small> */}
                    </div>
                </Modal.Footer>
            </Modal> : null}


            {VideoDetailModal ? <Modal
                show={VideoDetailModal}
                // dialogClassName="modal-90w"
                size={"xl"}
                aria-labelledby="example-custom-modal-styling-title"
                onHide={handleClose}
                backdrop="static"
                animation={false}
                // keyboard={false}
                centered
            >
                <Modal.Header closeButton={(UploadingVideoTitle !== "" && UploadingVideoTitle !== undefined && UploadingVideoTitle !== null) ? true : false}>
                    <Modal.Title>{FileTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ padding: 10, height: 350, width: "100%" }}>
                        {isUploading ? <div style={{ position: "absolute", top: "30%", left: "35%", zIndex: 100 }}>
                            <img src={loadingDataGif} width="350" />
                        </div> : null}
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div style={{ width: "60%", padding: 10, height: 340, overflow: "scroll", scrollbarWidth: "none" }}>
                                <h4>Details</h4>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Add a title that describe your video"
                                    multiline
                                    disabled={isUploading ? true : false}
                                    maxRows={4}
                                    fullWidth
                                    style={{ marginTop: 15, paddingTop: 10 }}
                                    value={UploadingVideoTitle}
                                    onChange={(e) => handleVideoTitle(e)}
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Tell Viewers about your video"
                                    multiline
                                    fullWidth
                                    disabled={isUploading ? true : false}
                                    style={{ marginTop: 20, paddingTop: 10 }}
                                    rows={4}
                                    value={UploadingVideoDesp}
                                    variant="outlined"
                                    onChange={(e) => handleVideoDesp(e)}

                                />
                                <br /><br />
                                <div style={{ width: "90%", display: "flex", flexDirection: "column" }}>
                                    <b>Thumbnail</b><br />
                                    <small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small>
                                    <label style={{ width: 120, background: "snow", marginBottom: 20 }}>
                                        <div style={{ background: "#edf2ef", marginTop: 10, cursor: "pointer", height: 100, width: 170, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: 19 }} color="grey" />
                                            <small>Upload thumbnail</small>
                                        </div>
                                        <input accept="image/*" type="file" name="myfile" style={{ display: "none" }} onChange={(e) => UploadThumbNail(e)} />
                                    </label>
                                </div>
                            </div>
                            <div style={{ width: '35%', padding: 5, display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <video width="370" height="200" controls style={{ background: "black" }}>
                                    <source src={url} type="video/mp4" />
                                </video>
                                <div style={{ width: "370", alignSelf: "flex-start", height: "50", padding: 8, display: "flex", flexDirection: "column" }}>
                                    <small>Video link</small>
                                    <a href="#" target="_blank" style={{ fontWeight: "400", color: "blue" }}>{window.location.origin + "/" + VideoID}</a>
                                    <br />
                                    <small>Filename</small>
                                    <b style={{ fontWeight: "400" }}>{FileName}</b>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", width: "90%" }}>
                        <Button variant="primary" onClick={() => SaveAsDraft()} disabled={UploadingVideoTitle !== "" && UploadingVideoTitle !== undefined && UploadingVideoTitle !== null ? false : true}>SAVE AS DRAFT</Button>
                        <Button variant="success" style={{ marginLeft: 10 }} disabled={UploadingVideoTitle !== "" && UploadingVideoTitle !== undefined && UploadingVideoTitle !== null ? false : true}>NEXT</Button>
                    </div>
                </Modal.Footer>
            </Modal> : null}



        </div>
    )
}

export default ChannelDashboard;