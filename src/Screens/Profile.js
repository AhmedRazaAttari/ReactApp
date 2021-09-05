import React from 'react';
import { Header } from '../component/header';
import { faBell, faChevronDown, faExternalLinkAlt, faHome, faMap, faRestroom, faScrewdriver, faStore, faSubscript, faToolbox, faTools, faUserEdit, faUsers, faUserSecret, faUsersSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNutritionix, faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons';

function UserProfile() {
    return (
        <div>
            <Header />

            <div className="Gradient ProfileSidebar" style={{ width: '17%', height: '100vh' }}>
                <ul>
                    <li><span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span>Profile Setting</a><FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 10 }} color="white" /></span>
                        <ul>
                            <li><a><span><FontAwesomeIcon icon={faUserEdit} style={{ marginRight: 15 }} color="white" /></span>General</a></li>
                            <li><a><span><FontAwesomeIcon icon={faUserSecret} style={{ marginRight: 15 }} color="white" /></span>Privacy</a></li>
                            <li><a><span><FontAwesomeIcon icon={faStripe} style={{ marginRight: 15 }} color="white" /></span>Subscription Plan</a></li>
                        </ul>
                    </li>

                    <li><span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><a><span><FontAwesomeIcon icon={faStore} style={{ marginRight: 15 }} color="white" /></span>Channel Setting</a><FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 10 }} color="white" /></span>
                        <ul>
                            <li><a><span><FontAwesomeIcon icon={faUserEdit} style={{ marginRight: 15 }} color="white" /></span>Create Channel</a></li>
                            <li><a><span><FontAwesomeIcon icon={faTools} style={{ marginRight: 15 }} color="white" /></span>Channel Setting</a></li>
                            <li><a><span><FontAwesomeIcon icon={faUsersSlash} style={{ marginRight: 15 }} color="white" /></span>Subscribers</a></li>
                        </ul>
                    </li>
                    <li><a><span><FontAwesomeIcon icon={faBell} style={{ marginRight: 15 }} color="white" /></span>Notifications</a></li>
                    <li><a><span><FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: 15 }} color="white" /></span>Logout</a></li>

                </ul>
            </div>

            <h1>User Profile</h1>
        </div>

    )
}

export default UserProfile;