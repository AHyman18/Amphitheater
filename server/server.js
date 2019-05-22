const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = require('ws').Server;

const bodyParser = require('body-parser');

const db = require('./database/database');

const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const app = express();
const httpsServer = https.createServer(serverConfig, app);
const wss = new WebSocketServer({ server: httpsServer });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(path.join(__dirname, '../build/')));

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
  return res.json({});
});

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

httpsServer.listen(3000);
module.exports = httpsServer;
