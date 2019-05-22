import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Signup() {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const [validated, setValidated] = useState(null);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const handleRedirect = () => {
    if (validated) return <Redirect to="/homepage/" />;
    if (validated === false) return <Redirect to="/" />;
  };
  function submitCredentials(e) {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(validatedStatus => {
        console.log(' this is the response', validatedStatus);
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
      <h2>Welcome new user, please enter your username and password below</h2>
      <form onSubmit={submitCredentials}>
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
