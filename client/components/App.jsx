import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import WelcomePage from './WelcomePage';
import Signup from './Signup';
import HomePage from './Homepage';

const LinkDiv = styled.div`
  display: flex;
  margin: 0;
  body{
    text
  }
  ul {
    text-decoration: none;
    background-color: #fb406f;
  }
  a {
    color: black;
    text-decoration: 'none';
  }
  li > a {
    text-decoration: none;
  }

  li {
    text-decoration: none;
    color: white;
    display: block;
    transition: 0.3s background-color;
  }

  li :hover {
    background-color: white;
  }

  li.active {
    background-color: #005f5f;
    color: #444;
    cursor: default;
  }
`;
function AppRouter() {
  return (
    <Router>
      <LinkDiv>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/signup/">Signup</Link>
            </li>
            <li>
              <Link to="/homepage/">homepage</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/homepage/" component={HomePage} />
      </LinkDiv>
    </Router>
  );
}

export default AppRouter;
