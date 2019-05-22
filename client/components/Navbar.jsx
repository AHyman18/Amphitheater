import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './landingPageComponents/Login';
import Signup from './landingPageComponents/Signup';

const NavDiv = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid purple;
`;

const NavP = styled.p`
  // padding: 25px;
  // width: 100%;
  height: 100%;
  background-color: red;
`;

const Navbar = () => {
  return (
    <NavDiv>
      <NavP>Blah </NavP>
      <NavP>About Us </NavP>
      <BrowserRouter>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </BrowserRouter>
    </NavDiv>
  );
};
export default Navbar;
