import React, { useContext, useEffect, useState } from 'react';
import { faHeart, faHome, faStream, faSubscript, faPlay, faPlayCircle, faClock, faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Link
} from "react-router-dom";
import { Header } from '../component/header';
import firebase from '../Config/FirebaseConfig';


function Settings() {

    return (
        <div>
            {/* header */}
            <Header />

            <div style={{ display: "flex", flexDirection: "row" }}>
                {/* Sidebar */}
                <div className="Gradient Sidebar" style={{ width: '17%', height: '100vh' }}>
                    <ul>
                        <li><a><span><FontAwesomeIcon icon={faHome} style={{ marginRight: 15 }} color="white" /></span>Home</a></li>
                        <li><a><span><FontAwesomeIcon icon={faStream} style={{ marginRight: 15 }} color="white" /></span>Now Streaming</a></li>
                        <li><a><span><FontAwesomeIcon icon={faSubscript} style={{ marginRight: 15 }} color="white" /></span>Subscription</a></li>
                        <li><a><span><FontAwesomeIcon icon={faHeart} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Liked Videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlayCircle} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Library</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faPlay} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Your videos</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faClock} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Watch Later</Link></a></li>
                        <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span><Link style={{ color: "white", textDecoration: "none" }}>Settings</Link></a></li>
                    </ul>
                </div>

            </div>
        </div >
    )
}


export default Settings