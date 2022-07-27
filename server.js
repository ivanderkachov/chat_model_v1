const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const socketio = require("socket.io")
const io = socketio(server, {
  cors: {
    origin: "*"
  }
})

const { addUser, removeUser, getUser, getUserInRoom} = require('./users')

const router = require('./router')

const port = process.env.PORT || 8090


io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) {
      return callback(error)
    }
    console.log(user, error);
    socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`})
    socket.join(user.room)
    const roomData = getUserInRoom(user.room)
    console.log(roomData)
    io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})
    callback()
  })
  socket.on('sendMessage', (message, callback) => {
    console.log(message)
    const user = getUser(socket.id)
    io.to(user.room).emit('message', { user: user.name, text: message})

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`})
      io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})
    }
  })
})


app.use(router)

server.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})

