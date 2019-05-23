import React from 'react';
import styled from 'styled-components';
import LandingPage from './landingPage';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Homepage from '../components/Homepage';
import Login from '../components/landingPageComponents/Login';

const AppDiv = styled.div`
  height: 100%;
  width: 100%;
`;
function App() {
  return (
    <AppDiv className="App">
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Login} />
      </BrowserRouter>
    </AppDiv>
  );
}

export default App;
