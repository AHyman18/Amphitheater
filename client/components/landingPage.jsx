import React from 'react';
import styled from 'styled-components';
import LandingContent from './landingPageComponents/landingContent';
import Navbar from './Navbar';

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
      <Navbar />

      <LandingContent />
    </StyledLand>
  );
};

export default LandingPage;
