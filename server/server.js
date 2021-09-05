// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
// const mongoose = require('./config/db');
// const db = mongoose.connection;
// const bodyParser = require('body-parser');
// require('dotenv').config()

// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// app.use(cors({
//     origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com'],
//     methods: ['GET', 'POST']
// }));

// app.use(bodyParser.json());

// db.once('open', function () {
//     console.log("Database Connected Successfully");
// });

// const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Running');
// });

// io.on("connection", (socket) => {
//     socket.emit("me", socket.id);
// });

// app.use('/', require('./routes/index'));

// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));












const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('./config/db');
const db = mongoose.connection;
const server = require("http").createServer(app);
const bodyParser = require('body-parser');
require('dotenv').config()
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: ['http://localhost:3000', 'https://vidoe-51f03.web.app', 'https://www.google.com'],
    methods: ['GET', 'POST']
}));


app.use(bodyParser.json());

db.once('open', function () {
    console.log("Database Connected Successfully");
});

// app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://myportfolio-83d30.web.app/");
//     res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get('/', (req, res) => {
    res.send('Running');
});
const users = {};

const socketToRoom = {};

// socket.on('startStream', function (data, callback) {
//     console.log(data);
//     callback('received ' + data);
// })

io.on("connection", (socket) => {
    // var LiveStreamingsArr = [];
    // var NewLiveData = {
    //     StreamID,
    //     Broadcaster_SocketSignal: SocketSignal
    // };
    // LiveStreamingsArr.push(NewLiveData)
    socket.emit("MyID", socket.id);

    // socket.on("OnstartNewStream", (StreamID, SocketSignal, callback) => {
    //     io.to(StreamID).emit("YourStreamStart", { signal: SocketSignal });
    //     callback({
    //         status: "ok"
    //     });
    // })

    // socket.on("ReqSignalData", (data) => {
    //     io.to(data.to).emit("ProvideSignalData", { from: data.from })
    // })

    // socket.on("Providing", (data) => {
    //     console.log(data)
    // })



    // socket.on("SendOfferToBroadCaster", (data, callback) => {
    //     io.to(data.broadcasterid).emit("ReceiveOffer", (data))
    // })

    // socket.on("AcceptViewerOffer", (data) => {
    //     io.to(data.viewerid).emit("OfferAccepted", (data.signal))
    // })

});

app.use('/', require('./routes/index'));

server.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening")
})