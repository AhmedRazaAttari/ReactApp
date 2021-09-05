import React, { useState, useCallback, useEffect, useRef } from 'react';
import { faAlignJustify, faCog, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Video from 'twilio-video';
import logo from '../../assets/logo1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Dropdown, Modal, Button } from 'react-bootstrap';
import profilepic from '../../assets/profilepic.png';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
    Link
} from "react-router-dom";
import firebase from '../../Config/FirebaseConfig';
import liveIcon from '../../assets/liveIcon.png';

function ManageLiveStreaming() {

    // Set User Profile Data
    const [userID, setUserID] = useState();
    const [UserProfilePic, setUserProfilePic] = useState();
    const [UserEmail, setUserEmail] = useState();
    const [UserChannelID, setUserChannelID] = useState();
    const [UserFirstName, SetUserFirstName] = useState();
    const [UserLastName, setUserLastName] = useState();

    function SignOUT() {
        firebase.auth().signOut().then(() => {
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
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
                    }
                }))
            }
            else {
            }
        })

    }, []);

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
                    <li><a><span><img src={liveIcon} style={{ width: 25 }} /></span><Link to={{ pathname: "/channel/liveStreaming" }} style={{ color: "white", textDecoration: "none", fontSize: 16, marginLeft: 10 }}>Stream</Link></a></li>
                    <li style={{ background: "linear-gradient(140deg, #ed8f5c 0%,#d6946f 90%)" }}><a><span><FontAwesomeIcon icon={faCog} style={{ marginRight: 15, fontSize: 17 }} color="white" /></span><Link to={{ pathname: "/channel/ManageLiveStreaming" }} style={{ color: "white", textDecoration: "none", fontSize: 16 }}>Manage</Link></a></li>
                </ul>
            </div>
            <div style={{ width: "83%", height: "100vh", alignSelf: "center", display: "flex", justifyContent: "center", position: "relative" }}>
                
            </div>

        </div>
    </div>
}

export default ManageLiveStreaming;
