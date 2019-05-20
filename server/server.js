const express = require('express');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
const wss = new WebSocketServer({ server: app });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(path.join(__dirname, '../build/')));

//cert files
const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

// create a post request that handles the sign in information
app.get('/', (req, res) => {
  console.log('serving index html');
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/clientRTC.js', (req, res) => {
  console.log('serving client rtc');
  return res.sendFile(path.join(__dirname, '../client/clientRTC.js'));
});

// insert dbController middleware Create/hash/insert, next
app.post('/signup', db.createUser, (req, res) => {
  //   boolean val--has been signed up
  console.log('aaaaaa');
  console.log(res.locals);
  return res.json(res.locals.loggedIn);
});

// insert dbController middleware find, validate, next
app.post('/login', db.getUser, (req, res) => {
  console.log('im in the login');
  //   send back the username  to front end
  return res.json(req.body.username);
});
// this was added to make sure the all routes in the devserver are not poxyied into other routes in the  express server. Every get request is served the index.html
// app.get('*', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../public/index.html'));
// });

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    // Broadcast any received message to all clients
    console.log('received: %s', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
app.listen(3000);
module.exports = app;
