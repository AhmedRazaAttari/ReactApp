// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// // // const socket = io('http://localhost:5000/')

// function Live() {

//     const [stream, setStream] = useState(null)
//     const [me, setMe] = useState('')
//     const [call, setCall] = useState({})
//     const [callAccepted, setCallAccepted] = useState(false)
//     const [callEnded, setCallEnded] = useState(false)
//     const [name, setName] = useState('')


//     const myVideo = useRef();
//     const uservideo = useRef();
//     const connectionRef = useRef();
//     console.log(me)
//     console.log(call)

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((currentStream) => {
//                 setStream(currentStream);

//                 myVideo.current.srcObject = currentStream;
//             });
//         socket.on("me", (id) => setMe(id))

//         // socket.on("calluser", ({ from, name: callerName, signal }) => {
//         //     setCall({ isRecievedCall: true, from, name: callerName, signal })
//         // })
//         // console.log(call)
//     }, [])

//     // const answerCall = () => {
//     //     setCallAccepted(true)

//     //     const peer = new Peer({ initiator: false, trickle: false, stream })

//     //     peer.on('signal', (data) => {
//     //         socket.emit('answercall', { signal: data, to: call.from })
//     //     });

//     //     peer.on('stream', (currentStream) => {
//     //         uservideo.current.srcObject = currentStream
//     //     })

//     //     peer.signal(call.signal);

//     //     connectionRef.current = peer;
//     // }

//     // const CallUser = (id) => {
//     //     const peer = new Peer({ initiator: true, trickle: false, stream })
//     //     // console.log(peer)
//     //     peer.on('signal', (data) => {
//     //         socket.emit('calluser', { userToCall: id, signalData: data, from: me, name })
//     //     });

//     //     peer.on('stream', (currentStream) => {
//     //         uservideo.current.srcObject = currentStream
//     //     });

//     //     socket.on("callaccepted", (signal) => {
//     //         setCallAccepted(true);

//     //         peer.signal(peer);
//     //     })

//     //     connectionRef.current = peer;

//     // }

//     // const leaveCall = () => {

//     //     setCallEnded(true);

//     //     connectionRef.current.destroy();

//     //     window.location.reload();
//     // }


//     return (
//         <div style={{ display: "flex", justifyContent: "center", height: "100vh", width: "100%" }}>
//             {stream && (
//                 <video playsInline muted ref={myVideo} autoPlay />
//             )}
//         </div>
//     )
// }

// export default Live;