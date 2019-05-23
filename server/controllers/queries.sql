CREATE TABLE users
(
  _id SERIAL PRIMARY KEY,
  username VARCHAR (25),
  password VARCHAR (100),
)

INSERT INTO users
  (username, password)
VALUES
  ('nathan', 'password123');
  