import React from 'react';
import styled from 'styled-components';
import LandingContent from './landingPageComponents/landingContent';

const StyledLand = styled.div`
  height: 100%;
  width:100%
  background-image: lightpink;
  display: grid;
 
  `;

const LandingPage = () => {
  return (
    <StyledLand className="landingPage">
      <LandingContent />
    </StyledLand>
  );
};

export default LandingPage;
