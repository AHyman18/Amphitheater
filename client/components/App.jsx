import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login.jsx'
import Signin from './Signin.jsx'

function Home() {
  return (
    <div>
      <h2>Welcome to Amphitheater.</h2>
      <p>The app is designed to get fitness instructors and their trainees together in one space.</p>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/signin/">Signin</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/login/" component={Login} />
        <Route path="/signin/" component={Signin} />
      </div>
    </Router>
  );
}

export default AppRouter;
