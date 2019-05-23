import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Signup() {
  // State Management
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(null);

<<<<<<< HEAD
  // Styling
  const title = {
    color: 'black',
    fontSize: '1.2em',
    textAlign: 'center',
  };

  const box = {
    margin: 'auto',
    alignItems: 'center',
    height: '25em',
    width: '30em',
    border: '0.2em solid grey',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'stretch',
    fontWeight: '900',
  };

  const forms = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    width: '80px',
    flexDirection: 'column',
  };

  const inputStyle = {
    margin: '7px',
    width: '15em',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid grey',
    backgroundColor: '#f4f4f4',
    opacity: '0.6',
    height: '1.7em',
    borderRadius: '8px',
  };
=======
  // useEffect(() => {
  //   console.log('checkcheck');
  //   if (validated) return <Redirect to="/homepage/" />;
  //   if (validated === false) return <Redirect to="/" />;
  // });
>>>>>>> dev

  const submitStyle = {
    color: 'black',
    backgroundColor: 'lightpink',
    border: '1px solid grey',
    borderRadius: '8px',
    padding: '0.5em',
    width: '15em',
    letterSpacing: '10px',
    fontFamily: 'serif',
    margin: '2em',
    color: 'black',
  };

  // Event Handlers
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
    console.log('EEEEE', e.event);
    e.preventDefault();
    const data = {
      username,
      password,
    };
    fetch(`https://${window.location.hostname}:3000/signup`, {
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
    <div style={box}>
      <h4 style={title}>
        <p>Welcome new user.</p>
        <p>
          Please enter a unique <em>username</em> and <em>password</em> below.
        </p>
      </h4>
      <form style={forms} onSubmit={submitCredentials}>
        username
        <input
          type="text"
          style={inputStyle}
          name="username"
          // placeholder="username"
          onChange={handleNameChange}
        />
        password
        <input
          type="text"
          style={inputStyle}
          name="password"
          // placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input style={submitStyle} type="submit" value="SUBMIT" />
      </form>
      {handleRedirect()}
    </div>
  );
}
