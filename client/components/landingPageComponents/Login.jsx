import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Homepage from '../Homepage';
// import Video from '../../assets/SilhouetteJogger.mp4';

// const videoStyle = {
//   position: 'fixed',
//   right: '0',
//   bottom: '0',
//   minWidth: '100%',
//   minHheight: '100%',
// };

const BackgroundDivStyle = styled.div`
display: flex,
justify-content: center,
  width: 100%,
  height: 100%,
  background-color: #f4f4f4
`;

const LoginDivStyle = styled.div`
align-items: center,
  background-color: #708090
`;

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

    fetch('http://localhost:3000/login', {
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
    <BackgroundDivStyle>
      {/* <div>
        <video className={videoStyle} autoPlay muted loop id="myVideo">
          <source src={Video} type={video / mp4} />
        </video>
      </div> */}
      <LoginDivStyle>
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
      </LoginDivStyle>
    </BackgroundDivStyle>
  );
}
