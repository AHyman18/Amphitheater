const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(path.join(__dirname, '../build/')));

// create a post request that handles the sign in information
app.get('/', (req, res) => {
  console.log('serving index html');
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

// insert dbController middleware Create/hash/insert, next
app.post('/signup', db.createUser, (req, res) => {
  //   boolean val--has been signed up
  return res.json(req.locals.loggedIn);
});

// insert dbController middleware find, validate, next
app.post('/login', db.getUser, (req, res) => {
  //   send back the username  to front end
  return res.json(req.body.username);
});
// this was added to make sure the all routes in the devserver are not poxyied into other routes in the  express server. Every get request is served the index.html
app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000);
module.exports = app;
