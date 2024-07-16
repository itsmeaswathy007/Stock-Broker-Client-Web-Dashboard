const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

let stockPrices = {
  GOOG: (Math.random() * 1000).toFixed(2),
  TSLA: (Math.random() * 1000).toFixed(2),
  AMZN: (Math.random() * 1000).toFixed(2),
  META: (Math.random() * 1000).toFixed(2),
  NVDA: (Math.random() * 1000).toFixed(2),

};

app.use(cors());

setInterval(() => {
  for (let stock in stockPrices) {
    stockPrices[stock] = (Math.random() * 1000).toFixed(2);
  }
  console.log('Broadcasting stock prices:', stockPrices); 
  io.emit('stockPrices', stockPrices);
}, 1000);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('stockPrices', stockPrices);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Listening on *:4000');
});
