import React from 'react';
import styled from 'styled-components';
import LandingPage from './landingPage';

const AppDiv = styled.div`
  height: 100%;
  width: 100%;
`;
function App() {
  return (
    <AppDiv className="App">
      <LandingPage />
    </AppDiv>
  );
}

export default App;
