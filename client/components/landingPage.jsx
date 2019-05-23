import React from 'react';
import styled from 'styled-components';
import LandingContent from './landingPageComponents/landingContent';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const StyledLand = styled.div`
  height: 100%;
  width:100%
  display: grid;
  grid-template-areas: '
n n n n 
l l l l
';
`;

const LandingPage = () => {
  return (
    <StyledLand>
      <p>THIS IS THE LANDING PAGE</p>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/homepage">Homepage</Link>
    </StyledLand>
  );
};

export default LandingPage;
