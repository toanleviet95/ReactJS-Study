const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log('User connected');

    socket.on('change color', (color) => {
        console.log('Color Changed to: ', color)
        io.sockets.emit('change color', color)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
