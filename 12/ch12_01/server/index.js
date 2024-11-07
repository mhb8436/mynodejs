const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express(); // not http server middleware  
const server = http.createServer(app); 
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        method: ["GET", "POST"]
    }
});
// socket.io 받은 데이터를 처리하는 로직 
io.on('connection', (socket) => { // 2)
    console.log(`a user connected `, socket);

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });

    socket.on('chat:message', (msg) => { // 4)
        console.log(`chat:message => ${msg}`);
        io.emit('chat:message', msg); // 5)
    });
});

server.listen(3030, ()=>{
    console.log(`socket.io server is running on 3030`);
});