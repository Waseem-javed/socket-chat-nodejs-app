const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'index.html'))
})

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname,'error.html'))
})

server.listen(port, () => {
  console.log('listening on port :',port);
});

//socket setup
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  io.on('disconnect', () => console.log('socket disconnected'))
  console.log('socket connected')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})