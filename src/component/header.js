import React from 'react';
import { faAlignJustify, faArrowCircleDown, faBell, faBookmark, faCog, faEnvelope, faFileVideo, faHome, faKey, faMap, faPlay, faPlayCircle, faSignOutAlt, faSubscript, faUsers, faVideo, faVideoSlash, faWifi } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Dropdown } from 'react-bootstrap';
import profilepic from '../assets/profilepic.png';
import {
    Link
} from "react-router-dom";
import '../css/header.css';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import uploadIcon from '../assets/uploadIcon.png';
import liveIcon from '../assets/liveIcon.png';
import firebase from '../Config/FirebaseConfig';


function Header(props) {

    function SignOUT() {
        firebase.auth().signOut().then(() => {
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div style={{ width: "100%", height: 55, paddingLeft: 20, paddingRight: 15, display: "flex", justifyContent: "space-between", boxShadow: "0 0 10px #f2f2f2", alignItems: "center" }}>
            <div style={{ alignItems: "center", display: "flex" }}>
                <FontAwesomeIcon onClick={props.SidebarToggle} icon={faAlignJustify} style={{ marginRight: 15, cursor: "pointer", fontSize: 20 }} color="grey" />
                <Link to="/home"><img src={logo} style={{ width: 90 }} alt="" /></Link>
            </div>
            <Form.Control id="headerSearchBar" type="email" placeholder="Search for" style={{ background: "#eceff0 none repeat scroll 0 0", height: 35, borderRadius: 3, border: 'none' }} />
            <div id="headerThreeIcons" style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: "none", width: 40, height: 40, outline: "none", display: "flex", justifyContent: "center", alignItems: "center", background: "white" }}>
                        <FontAwesomeIcon icon={faVideo} style={{ fontSize: 18, cursor: "pointer", marginLeft: 10 }} color="black" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item href="#">
                            <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                <img src={uploadIcon} style={{ width: 20 }} />
                                <Link to={{ pathname: "ChannelContent", state: { WantToUpload: true } }} style={{ color: "black", fontSize: 15, textDecoration: "none", marginLeft: 10 }}>Upload Video</Link>
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                            <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                <img src={liveIcon} style={{ width: 25 }} />
                                <Link to="/channel/liveStreaming" style={{ color: "black", textDecoration: "none", marginLeft: 10 }}>Go Live</Link>
                            </span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <li id="VideosOptionsIcon" style={{ listStyle: "none" }}><FontAwesomeIcon icon={faVideo} style={{ fontSize: 18, cursor: "pointer" }} color="grey" />
                    <div id="VideosOptions" style={{ width: 150, height: 85, background: "white", zIndex: 1, boxShadow: "#f3ecec 0px 0px 13px 0px", position: "absolute", top: 42, right: 45 }}>
                        <ul>
                            <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 10 }} color="black" /></span><Link to={{ pathname: "ChannelContent", state: { WantToUpload: true } }} style={{ color: "black", fontSize: 15, textDecoration: "none" }}>Upload Video</Link></a></li>
                            <li><a><span><FontAwesomeIcon icon={faWifi} style={{ marginRight: 10 }} color="black" /></span><Link style={{ color: "black", textDecoration: "none" }}>Go Live</Link></a></li>
                        </ul>
                    </div>
                </li> */}


                <li id="NotificationIcon" style={{ listStyle: "none" }}><FontAwesomeIcon style={{ fontSize: 18, cursor: "pointer" }} icon={faBell} color="grey" />
                    <div id="NotificationsDiv" style={{ width: 400, height: 600, background: "white", boxShadow: "#f3ecec 0px 0px 13px 0px", position: "absolute", zIndex: 100, top: 1, right: 117 }}>
                        <div style={{ height: 50, width: "100%", borderBottom: "1px solid lightgrey", display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
                            <b>Notifications</b>
                            <FontAwesomeIcon icon={faCog} style={{ fontSize: 18 }} color="lightseagreen" />
                        </div>
                    </div>
                </li>


                <Dropdown style={{ marginRight: 10 }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: "none", width: 35, height: 35, display: "flex", borderRadius: 40, justifyContent: "center", alignItems: "center", background: "white" }}>
                        <img src={props.UserPic} style={{ width: 45, height: 45, borderRadius: 100, marginLeft: 15 }} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: 300, right: 300 }}>
                        <div style={{ padding: 10, width: "100%", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <img src={props.UserPic} style={{ width: 40, height: 40, borderRadius: 40 }} alt="" />
                            <b style={{ fontSize: 18, marginLeft: 20, fontWeight: "500" }}>{props.UserName}</b>
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
                {/* <li id="profileBtn" className="ProfileTab" style={{ border: "none", display: "flex", flexDirection: "row", alignItems: "center", padding: 5, marginRight: 10, background: "linear-gradient(120deg, #826cfd 0%, #ff516b 100%)", borderRadius: 40 }}>
                    <img src={profilepic} style={{ width: 30, height: 30, borderRadius: 30 }} alt="" />
                    <div id="profileOptions" style={{ width: 300, background: "white", boxShadow: "#f3ecec 0px 0px 13px 0px", border: "1px solid #d5caca", borderTop: "none", position: "absolute", zIndex: 100, top: 1, right: 70 }}>
                        <div style={{ padding: 20, width: "100%", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <img src={profilepic} style={{ width: 40, height: 40, borderRadius: 40 }} alt="" />
                            <b style={{ fontSize: 19, marginLeft: 20 }}>User Name</b>
                        </div>
                        <ul>
                            <li><a><span><FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 15, fontSize: 20 }} color="grey" /></span>Your channel</a></li>
                            <li><a><span><FontAwesomeIcon icon={faKey} style={{ marginRight: 15, fontSize: 20 }} color="grey" /></span>Purchases and memberships</a></li>
                            <li><a><span><FontAwesomeIcon icon={faCog} style={{ marginRight: 15, fontSize: 20 }} color="grey" /></span>Settings</a></li>
                            <li><a><span><FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 15, fontSize: 20 }} color="grey" /></span>Signout</a></li>
                        </ul>
                    </div>
                </li> */}

            </div>
        </div>
    )
}



export {
    Header
}