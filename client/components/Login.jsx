import React, { useState } from 'react';
import Homepage from './Homepage';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // first element of arr = the initial value of the state, [1] = update of state
  const [hidden, setHidden] = useState(true);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function changeHiddenStatus(e) {
    e.preventDefault();
    setHidden(false);

    // const data = {
    //   name,
    //   password,
    // };
    // On submit of the form, send a POST request with the data to the database/server.
    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(function(response) {
    //     return JSON.stringify(response);
    //   })
    //   .then(function(body) {
    //     // Check if body is verified in the database and then route person to Profile page.
    //   });
  }

  let homepage = null;
  if (!hidden) {
    homepage = <Homepage />;
  }

  return (
    <div>
      <h2>Please enter your username and password below</h2>
      <form onSubmit={changeHiddenStatus}>
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
      {homepage}
    </div>
  );
}
