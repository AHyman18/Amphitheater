import React, { Component } from 'react';

class Forgotpw extends Component {
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
      username,
      password,
    };
    // change server route to signup instead of signin
    fetch('http://localhost:3000/forgot_username', {
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
        <h2>Forgot password? Enter your email address and a new password.</h2>
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

export default Forgotpw;
