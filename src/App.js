import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import SignupScreen from './Screens/Signup';
import LoginScreen from './Screens/Login';
import HomeScreen from './Screens/Home';
import VideoView from './Screens/VideoView';
import LiveStreamingView from './Screens/LiveStreamingView';

import firebase from './Config/FirebaseConfig';
import UserProfile from './Screens/Profile';
import MyChannel from './Screens/MyChannel';
import Live from './Screens/Live';
import ChannelDashboard from './Screens/ChannelStudio/Dashboard';
import ChannelContent from './Screens/ChannelStudio/Content';
import Subscription from './Screens/Subscriptions';
import LikeVideos from './Screens/LikedVideos';
import WatchLater from './Screens/WatchLater';
import ChannelComments from './Screens/ChannelStudio/Comments';

import loadingDataGif from './assets/loadingdata.gif';
import LiveStreaming from './Screens/ChannelStudio/LiveStreaming';
import ManageLiveStreaming from './Screens/ChannelStudio/ManageLiveStreaming';

import Temprary from './Screens/Temprary';


// import { SocketContext } from './component/SocketContext';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000')

export default function App() {
  // const { name, callAccepted, myVideo, uservideo, callEnded, stream, call } = useContext(SocketContext);
  const [isLoading, setisLoading] = useState(true)
  const [isAuthenticated, SetAuthenticated] = useState(false)
  const [me, setMe] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        SetAuthenticated(true)
      } else {
        SetAuthenticated(false)
      }
    })
    setTimeout(function () {
      setisLoading(false)
    }, 2000);
    // socket.on("me", (id) => console.log(id))
  }, [])

  const AuthRedirect = ({ component: Component, ...rest }) => {

    return (
      <Route {...rest} render={props =>
        !isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: "/Home" }} />
      }
      />
    )
  }

  const ProtectedRoutes = ({ component: Component, ...rest }) => {

    return (
      <Route {...rest} render={props =>
        !isAuthenticated ? <Redirect to={{ pathname: "/login" }} /> : <Component {...props} {...rest} />
      }
      />
    )
  }

  return (
    !isLoading ? <Router>
      {/* {stream && (
        <video playsInline muted ref={myVideo} autoPlay style={{ width: 300, height: 300}} />
      )}

      {callAccepted && !callEnded && (
        <video playsInline ref={uservideo} autoPlay style={{ width: 300, height: 300 }} />
      )} */}
      <AuthRedirect exact path='/login' component={LoginScreen} />
      <AuthRedirect exact path='/Signup' component={SignupScreen} />
      {/* <Route path='/Live' component={Live} /> */}
      {/* <Route path='/MyChannel' component={MyChannel} />
      <Route path='/Profile' component={UserProfile} /> */}

      <ProtectedRoutes exact path='/ChannelDashboard' component={ChannelDashboard} />
      <ProtectedRoutes exact path='/ChannelContent' component={ChannelContent} />
      <ProtectedRoutes exact path='/ChannelComments' component={ChannelComments} />

      <ProtectedRoutes path="/v/:VideoID" component={VideoView} />
      <ProtectedRoutes path="/Live/:StreamID" component={LiveStreamingView} />

      <Route path="/Temprary" component={Temprary} />
      <ProtectedRoutes path="/subscription" component={Subscription} />
      <ProtectedRoutes path="/likeVideos" component={LikeVideos} />
      <ProtectedRoutes path="/WatchLater" component={WatchLater} />

      <ProtectedRoutes path="/channel/liveStreaming" component={LiveStreaming} />
      <ProtectedRoutes path="/channel/ManageLiveStreaming" component={ManageLiveStreaming} />

      <ProtectedRoutes exact path='/Home' component={HomeScreen} />
      <ProtectedRoutes exact path='/' component={HomeScreen} />

    </Router> : <div style={{ position: "absolute", top: "30%", left: "35%", zIndex: 100 }}>
      <img src={loadingDataGif} width="350" />
    </div>

  );
  // return (

  // );
}