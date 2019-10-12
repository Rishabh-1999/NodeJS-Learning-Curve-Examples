const express = require('express');
const app = express();
const http = require('http');
const socket = require('socket.io')
const path = require('path');

const server = app.listen(3000);

app.use(express.static(path.join(__dirname,'/public')));

const io = socket(server);

io.on('connection',(socket)=>{
    console.log("A new User is connected",socket.id);
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
});

console.log("Running on port 3000");