const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
    path: "./.env",
});

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io, sendData);
console.log(io);
app.use(cors());
function sendData(socket) {
    socket.emit(
        "data1",
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 590) + 10)
    );
    setTimeout(() => {
        sendData(socket);
    }, 1000);
}
server.listen(3003, () => {
    console.log(`App running on port ${3003}...`);
});
