const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    reconnectionAttempts: 5,
  },
});



io.on('connection', (socket) => {
  console.log('Prisijunge');

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error); //TODO fix, bloga callback funkcija, kartais crashina

        socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room ${user.room}!`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name}, has joined the room!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        if(callback) callback();
    });
  

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', {user: user.name, text: message});
      io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user){
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!`});
      }
    });

});

app.use(router);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));