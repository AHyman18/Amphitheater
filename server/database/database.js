const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Connects to database
const pool = new Pool({
  user: 'otpqftii',
  host: 'isilo.db.elephantsql.com',
  password: 'nizupVSoOm0fWv2Ly6asZT5pNNzKj2Rn',
  database: 'otpqftii',
  port: 5432,
});

// Creates user from username and password form on /signup route. Encrypts password via Bcrypt and stores in database.
const createUser = (req, res, next) => {
  console.log('Connected to db.');
  const { username, password } = req.body;
  const saltRounds = 10;
  pool.connect((err, client, done) => {
    if (err) throw err;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw err;
      client.query(
        `INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`,
        done(),
      );
    });
    // return username
    next(req.body.username);
  });
};

// Confirms if username inputted on /login route matches username in database. If so, encrypts password, compares against Bcrypted password in db.
// Redirects to /signup page if no password or username match is found. Redirects to home page if there is a match.
const getUser = (req, res, next) => {
  console.log('ayyy');
  const { username, password } = req.body;
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(
      `SELECT * FROM users WHERE username = '${req.body.username}`,
      (err, results) => {
        if (err) console.error(err);
        console.log('RESUILTSS', results);
        if (results.rows.length < 1 || !password) {
          return false;
        }
        const hash = results.rows[0].password;
        bcrypt.compare(password, hash, (err, allow) => {
          console.log("you're in the bcrypt");
          if (err) return err;
          done();
        });
      },
    );
    next(true);
  });

  pool.query(
    `SELECT * FROM users WHERE username = '${req.body.username}'`,
    (err, results) => {
      if (err) console.error(err);
      if (results.rows.length < 1 || !password) {
        return false;
      }
      const hash = results.rows[0].password;
      bcrypt.compare(password, hash, (err, allow) => {
        if (err) return err;
        return username;
      });
    },
  );
  next();
};

// Export middleware.
module.exports = {
  createUser,
  getUser,
};
