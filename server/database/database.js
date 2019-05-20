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
  const { username, password } = req.body;
  console.log(username, password);
  const saltRounds = 10;
  pool.connect((err, client, done) => {
    if (err) throw err;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      console.log('IM IN THE HSA FUNCTION');
      if (err) throw err;
      client.query(
        `INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`,
        (err, user) => {
          if (err) {
            console.error(err);
            res.status(404).json({ loggedIn: false, username: user });
          }
        },
      );
    });

    // Create JWT
    // const createToken = (req, res, next) => {
    //   // Get auth header value
    //   const token = jwt.sign({ id: user._id }, config.secret, {
    //     expiresIn: 86400, // expires in 24 hours
    //   });
    // };
    res.locals.loggedIn = true;
    next();
  });
};

// Confirms if username inputted on /login route matches username in database. If so, encrypts password, compares against Bcrypted password in db.
// Redirects to /signup page if no password or username match is found. Redirects to home page if there is a match.
const getUser = (req, res, next) => {
  const { username, password } = req.body;
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(
      `SELECT * FROM users WHERE username = '${username}'`,
      (err, results) => {
        if (err) console.error(err);
        if (results.rows.length < 1 || !password) {
          return;
        }
        const hash = results.rows[0].password;
        bcrypt.compare(password, hash, (err, allow) => {
          if (err) return err;
          console.log('eeeeeee');
          done();
        });
      },
    );
  });
  next();
};

// Export middleware.
module.exports = {
  createUser,
  getUser,
};
