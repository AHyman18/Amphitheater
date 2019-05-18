import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const data = {
      username: username,
      password: password,
    };
    //change server route to signup instead of signin
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function(response) {
        return JSON.stringify(response);
      })
      .then(function(body) {
        console.log(body);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <h2>Welcome new user, please enter your username and password below</h2>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.firstname}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.lastname}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Signup;
