import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import LandingPage from './landingPage';
import Navbar from './Navbar';
import Login from './landingPageComponents/Login';
import Signup from './landingPageComponents/Signup';
import AboutUs from './landingPageComponents/AboutUs';
import ArrowComponent from './landingPageComponents/arrowComponent';
import ProjectComponent from './landingPageComponents/projectComponent';

library.add(faStroopwafel);

const appHistory = createBrowserHistory();

const AppDiv = styled.div`
  height: 100%;
  width: 100%;
`;
function App() {
  return (
    <AppDiv className="App">
      <BrowserRouter history={appHistory}>
        <Navbar />
        <ArrowComponent />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/aboutUs" component={AboutUs} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/project" component={ProjectComponent} />
          {/* <Route path="/homepage" component={Hompage} /> */}
        </Switch>
      </BrowserRouter>
    </AppDiv>
  );
}

export default App;
