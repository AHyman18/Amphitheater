const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// create a post request that handles the sign in information
app.get('/', (req, res) => {
  console.log('working');
});

// insert dbController middleware Create/hash/insert, next
app.post('/signup', (req, res) => {
  console.log(req.body);
  //   boolean val--has been signed up
});

// insert dbController middleware find, validate, next
app.post('/login', (req, res) => {
  //   send back the username  to front end
  console.log(req.body);
});

app.listen(3000);
module.exports = app;
