import React, { Component } from 'react';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {username,password} = this.state;
        const data = {
            username: username,
            password: password
        }
        // On submit of the form, send a POST request with the data to the database/server.
        fetch('http://localhost:3000/login', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(function(response) {
            return JSON.stringify(response);
          }).then(function(body) {
            //Check if body is verified in the database and then route person to Profile page.
          });
      }

    handleChange(event){
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
        <div>
            <h2>Please enter your username and password below</h2>
            <form onSubmit={this.onSubmit}>
                <input 
                  type='text' 
                  name='username' 
                  value={this.state.firstname} 
                  placeholder='Username'
                  onChange={this.handleChange}/>
                <input 
                  type='text' 
                  name='password' 
                  value={this.state.lastname} 
                  placeholder='Password'
                  onChange={this.handleChange}/>
                <input type='submit'/>
            </form>
        </div>
        );
    }
}

export default Login;
