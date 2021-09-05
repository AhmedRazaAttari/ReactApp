import React from 'react';
import ProfilePic from '../assets/profilepic.png';
import '../css/Temp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faSearch, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.gif';
import uploadIcon from '../assets/uploadIcon.png';
import liveIcon from '../assets/liveIcon.png';

function Temprary() {
    return (
        <div id="page-top">
            <nav className="navbar navbar-expand navbar-light bg-white static-top osahan-nav sticky-top">
                &nbsp;&nbsp;
                <button className="btn btn-link btn-sm text-secondary order-1 order-sm-0" id="sidebarToggle">
                    <FontAwesomeIcon icon={faBars} color="black" style={{fontSize : 17}}/>
                </button> &nbsp;&nbsp;
                <a className="navbar-brand mr-1" ><img className="img-fluid" alt="" src={logo} style={{ width: 110 }} /></a>

                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-5 my-2 my-md-0 osahan-navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..." />
                        <div className="input-group-append">
                            <button className="btn btn-light" type="button">
                                <FontAwesomeIcon icon={faSearch} color="black" />
                            </button>
                        </div>
                    </div>
                </form>

                <ul className="navbar-nav ml-auto ml-md-0 osahan-right-navbar">

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: "none", width: 40, height: 40, outline: "none", display: "flex", marginTop : 8, justifyContent: "center", alignItems: "center", background: "white" }}>
                            <FontAwesomeIcon icon={faVideo} style={{ fontSize: 18, cursor: "pointer", marginLeft: 10 }} color="black" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item href="#">
                                <span style={{ display: "flex", alignItems: "center", padding: 5 }}>
                                    <img src={uploadIcon} style={{ width: 20 }} />
                                    <Link to={{ pathname: "ChannelContent", state: { WantToUpload: true } }} style={{ color: "black", textDecoration: "none", marginLeft: 10 }}>Upload Video</Link>
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

                    {/* <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faBell} color="black" />
                            <span className="badge badge-danger">9+</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-edit "></i> &nbsp; Action</a>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-headphones-alt "></i> &nbsp; Another
                                action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-star "></i> &nbsp; Something else here</a>
                        </div>
                    </li> */}
                    {/* <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw"></i>
                            <span className="badge badge-success">7</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-edit "></i> &nbsp; Action</a>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-headphones-alt "></i> &nbsp; Another
                                action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-star "></i> &nbsp; Something else here</a>
                        </div>
                    </li> */}
                    <li className="nav-item dropdown no-arrow osahan-right-navbar-user">
                        <a className="nav-link dropdown-toggle user-dropdown-link" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img alt="Avatar" src={ProfilePic} />
                            Osahan
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="account.html"><i className="fas fa-fw fa-user-circle"></i> &nbsp; My
                                Account</a>
                            <a className="dropdown-item" href="subscriptions.html"><i className="fas fa-fw fa-video"></i> &nbsp;
                                Subscriptions</a>
                            <a className="dropdown-item" href="settings.html"><i className="fas fa-fw fa-cog"></i> &nbsp; Settings</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal"><i
                                className="fas fa-fw fa-sign-out-alt"></i> &nbsp; Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Temprary;