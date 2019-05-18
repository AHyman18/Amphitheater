const { Pool, Client } = require('pg');
const pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

const conString =
  'postgres://otpqftii:nizupVSoOm0fWv2Ly6asZT5pNNzKj2Rn@isilo.db.elephantsql.com:5432/otpqftii';

const query = {
  text: 'INSERT INTO users(username, password) VALUES ($1, $2)',
  values: [`'${req.body.username}', '${req.body.password}'`]
};

var client = new pg.Client(conString);
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    client.end();
  });
});
