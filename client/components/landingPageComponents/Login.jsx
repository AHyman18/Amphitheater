import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Homepage from '../Homepage';

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

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(null);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleRedirect = () => {
    console.log('it work', validated);
    if (validated) {
      console.log('redirect me ma');
      return <Redirect to="/homepage/" />;
    }
    if (validated === false) return <Redirect to="/signup" />;
  };

  function checkUser(e) {
    e.preventDefault();
    console.log('IM HERE', e.target.elements[0].value);
    console.log('IM HEREEEEE', e.target.elements[1].value);

    const data = {
      username: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };
    // On submit of the form, send a POST request with the data to the database/server.

    fetch(`https://${window.location.hostname}:3000/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(validatedStatus => {
        console.log('validateee', validatedStatus);
        if (validatedStatus.username !== null) {
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
        <p>Welcome back.</p>
        <p>Summer's almost here. Time to get fit.</p>
      </h4>
      <form style={forms} onSubmit={checkUser}>
        username
        <input
          type="text"
          style={inputStyle}
          name="username"
          onChange={handleNameChange}
        />
        password
        <input
          type="text"
          style={inputStyle}
          name="password"
          onChange={handlePasswordChange}
        />
        <input style={submitStyle} type="submit" value="SUBMIT" />
      </form>
      {handleRedirect()}
    </div>
  );
}
