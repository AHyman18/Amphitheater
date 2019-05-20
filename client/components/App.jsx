import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import WelcomePage from './WelcomePage';
// import Signup from './Signup.jsx';
import HomePage from './Homepage';

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            {/* <li>
              <Link to="/signup/">Signup</Link>
            </li> */}
            <li>
              <Link to="/homepage/">homepage</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/login/" component={Login} />
        {/* <Route path="/signup/" component={Signup} /> */}
        <Route path="/homepage/" component={HomePage} />
      </div>
    </Router>
  );
}

export default AppRouter;
