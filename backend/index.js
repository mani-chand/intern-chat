const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
  }));
const corsOptions ={
    origin:'http://localhost:3000/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (username) => {
        socket.username = username;
        socket.join('chatRoom');
        console.log(username);
        io.to('chatRoom').emit('message', { username: 'Server', message: `${username} has joined the chat` });
    });

    socket.on('message', (message) => {
        io.to('chatRoom').emit('message', { username: socket.username, message });
        console.log(message);
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.to('chatRoom').emit('message', { username: 'Server', message: `${socket.username} has left the chat` });
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
