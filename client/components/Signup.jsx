import React, { useState } from 'react';

export default function Signup () {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function changeHiddenStatus(){ 
      
        // const data = {
        //   name,
        //   password,
        // };
        // On submit of the form, send a POST request with the data to the database/server.
        // fetch('http://localhost:3000/signup', {
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

  return (
    <div>
      <h2>Welcome new user, please enter your username and password below</h2>
      <form>
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
    </div>
  )
}
