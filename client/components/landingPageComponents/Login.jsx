import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import Homepage from './Homepage';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // first element of arr = the initial value of the state, [1] = update of state
  const [validated, setValidated] = useState(null);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleRedirect = () => {
    if (validated) return <Redirect to="/homepage/" />;
    if (validated === false) return <Redirect to="/signup" />;
  };

  function checkUser(e) {
    e.preventDefault();

    const data = {
      name,
      password,
    };
    // On submit of the form, send a POST request with the data to the database/server.

    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(validatedStatus => {
        console.log(validatedStatus);
        if (validatedStatus) {
          setValidated(true);
        } else {
          setValidated(false);
        }
      })
      .catch(err => console.log('this is and error', err));
  }

  return (
    <div>
      <h2>Please enter your username and password below</h2>
      <form onSubmit={checkUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleNameChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input type="submit" />
      </form>
      {handleRedirect()}
    </div>
  );
}
