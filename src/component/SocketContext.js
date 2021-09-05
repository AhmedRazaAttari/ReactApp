import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({ children }) => {

    const myVideo = useRef();
    const BroadcasterVideo = useRef();
    const connectionRef = useRef();
    const [broadcasterData, setbroadcasterData] = useState({});
    const [myID, setMyID] = useState('');
    const [ViewerID, setViewerID] = useState('')
    const [BroadCasterSignal, setbrodCasterSignal] = useState();
    const [ViewerSignal, setViewerSignal] = useState();

    const [currentStream, setCurrentStream] = useState();

    useEffect(() => {
        socket.on("MyID", (id) => setMyID(id))

        socket.on("YourStreamStart", data => {
            console.log("FROM EVENT YourStreamStart *** SIGNAL", data)
        })

        socket.on("ProvideSignalData", data => {
            socket.emit("Providing", data, myID)
        })


        // socket.on("ReceiveOffer", (data) => {
        //     const peer = new Peer({ initiator: false, trickle: false, currentStream });
        //     console.log("OFFER RECIEIVED")
        //     peer.on("signal", (signal) => {
        //         socket.emit("AcceptViewerOffer", { signal, viewerid: data.viewerid })
        //     })

        //     peer.signal(data.viewersignal)
        // })
    }, [])

    function CreateOffer(broadcasterid) {
        // var peer = new Peer({ initiator: true, trickle: false });

        // peer.on("signal", (signal) => {
        //     socket.emit("SendOfferToBroadCaster", { viewersignal: signal, broadcasterid, viewerid: myID })
        // })

        // socket.on("OfferAccepted", (signal) => {
        //     peer.signal(signal)
        // })

        // peer.on("stream", (stream) => {
        //     BroadcasterVideo.current.srcObject = stream;
        // })
    }

    function GetCurrentStream() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setCurrentStream(currentStream);
                myVideo.current.srcObject = currentStream;
            })
    }

    function StartStream() {
        var peer = new Peer({ initiator: true, trickle: false, currentStream });

        peer.on("signal", (signal) => {
            console.log("YE SIGNAL HAI", signal)
            socket.emit("OnstartNewStream", myID, signal, (response) => {
                console.log(response.status);
            })
        })

        socket.on("NewViewer", (signal) => {
            console.log("NewViewer===>", signal)
        })

        //     socket.on("NewViewer", (ViewerSignal) => {
        //         peer.signal(ViewerSignal);
        //     })

    }


    function JoinStream(StreamID) {
        console.log("Join Streaming Call")
        const peer = new Peer({ initiator: false, trickle: false });

        socket.emit("ReqSignalData", { to: StreamID, from: myID })

        peer.on("signal", (signal) => {
            console.log("YE Viewer KA SIGNAL HAI", signal)
            // socket.emit("GetViewerSignal_Specific", StreamID, myID, signal, (response) => {
            //     console.log(response.status);
            // })
        })

        socket.on("OnGettingBroadcasterSignal", (broadCasterSignal) => {
            peer.signal(broadCasterSignal);
        })

        peer.on("stream", (stream) => {
            BroadcasterVideo.current.srcObject = stream;
        })
    }

    return (
        <SocketContext.Provider value={{ GetCurrentStream, CreateOffer, StartStream, currentStream, myID, ViewerID, BroadCasterSignal, ViewerSignal, BroadcasterVideo, myVideo }}>
            {children}
        </SocketContext.Provider>
    )
}

export {
    ContextProvider, SocketContext
}