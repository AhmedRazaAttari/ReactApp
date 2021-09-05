import React, { useContext, useEffect, useState, useRef } from 'react';
import { faChevronDown, faArrowCircleDown, faBell, faBookmark, faEnvelope, faHeart, faHome, faMap, faStoreAlt, faStream, faSubscript, faUsers, faUpload, faSignal, faWifi, faCalendarTimes, faList } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Modal } from 'react-bootstrap';
import android from '../assets/android.png';
import ios from '../assets/ios.png';
import image from '../assets/image.png';
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';

// import ModalClass from '../component/Modal';

function MyChannel() {

    const myVideo = useRef();
    const [stream, setStream] = useState(null)
    const [show, setShow] = useState(false);
    const [IsChannel, SetChannel] = useState();


    

    return (
        <div>

            {/* header */}
            <Header />

            {/* {stream && (
                <video playsInline muted ref={myVideo} autoPlay style={{ width: 300, height: 300 }} />
            )} */}
            <div style={{ display: "flex", flexDirection: "row" }}>
                {/* Sidebar */}
                <div className="Gradient Sidebar" style={{ width: '17%', height: '100vh' }}>
                    <ul>
                        <li><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span>Home</a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span>Subscription</a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>

                        <li><span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><a><span><FontAwesomeIcon icon={faStoreAlt} style={{ marginRight: 15 }} color="white" /></span>My Channel</a><FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 10 }} color="white" /></span>
                            <ul>
                                <li><a><span><FontAwesomeIcon icon={faUpload} style={{ marginRight: 15 }} color="white" /></span><Link to="/MyChannel" style={{ color: "white", textDecoration: "none" }}>Upload Video</Link></a></li>
                                <li><a><span><FontAwesomeIcon icon={faWifi} style={{ marginRight: 15 }} color="white" /></span><Link to="/MyChannel" style={{ color: "white", textDecoration: "none" }}>GO LIVE</Link></a></li>
                                <li><a><span><FontAwesomeIcon icon={faCalendarTimes} style={{ marginRight: 15 }} color="white" /></span><Link to="/MyChannel" style={{ color: "white", textDecoration: "none" }}>Schedule Stream</Link></a></li>
                                <li><a><span><FontAwesomeIcon icon={faList} style={{ marginRight: 15 }} color="white" /></span><Link to="/MyChannel" style={{ color: "white", textDecoration: "none" }}>PlayLists</Link></a></li>
                            </ul>
                        </li>

                    </ul>
                </div>



                {/* <ModalClass /> */}
                {/* Footer */}
                <div style={{ width: '83%', height: '100vh', position: "relative" }}>

                    {/* <div style={{ padding: 20, width: "60%", margin: "0 auto" }}>
                        <h2>First Create Your Channel</h2>
                        <div style={{ display: "flex", padding: 10 }}>
                            <label style={{ height: 110, width: 110, borderRadius: 100, background: "snow", marginBottom: 20 }}>
                                <img src={image} style={{ width: 110, height: 110, borderRadius: 100 }} />
                                <input type="file" name="myfile" style={{ display: "none" }} />
                            </label>
                            <div style={{ padding: 10, width: "70%" }}>
                                <Form.Control type="name" placeholder="First Name" style={{ width: '70%' }} />
                                <Form.Control type="name" placeholder="Last Name" style={{ marginTop: 10, width: "70%" }} />
                            </div>
                        </div>
                        <p>By Clicking Create Channel, you agree to our term's and policies</p>
                    </div> */}

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

            
        </div>
    )
}


export default MyChannel


// if (stream) {

// }
// else {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((currentStream) => {
//             setStream(currentStream);

//             myVideo.current.srcObject = currentStream;
//         });
// }