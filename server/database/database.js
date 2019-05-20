const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Connects to database
const pool = new Pool({
  user: 'otpqftii',
  host: 'isilo.db.elephantsql.com',
  database:
    'postgres://otpqftii:nizupVSoOm0fWv2Ly6asZT5pNNzKj2Rn@isilo.db.elephantsql.com:5432/otpqftii',
  port: 5432,
});

// Creates user from username and password form on /signup route. Encrypts password via Bcrypt and stores in database.
const createUser = (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.error(err);
    pool.query(
      `INSERT INTO users(username, password) VALUES ('${username}', '${hash}')`,
      (err, results) => {
        if (err) res.setStatus(500);
        res.status(201).redirect('/');
        return true;
      },
    );
  });
  next();
};

// Confirms if username inputted on /login route matches username in database. If so, encrypts password, compares against Bcrypted password in db.
// Redirects to /signup page if no password or username match is found. Redirects to home page if there is a match.
const getUser = (req, res, next) => {
  const { username, password } = req.body;
  pool.query(
    `SELECT * FROM users WHERE username = '${req.body.username}`,
    (err, results) => {
      if (err) console.error(err);
      if (results.rows.length < 1 || !password) {
        res.redirect('/signup');
        return;
      }
      const hash = results.rows[0].password;
      bcrypt.compare(password, hash, (err, allow) => {
        if (err) return err;
        res.redirect('/');
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
