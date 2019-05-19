import React from 'react';
import styled from 'styled-components';
import Navbar from './homepage_Compenents/Navbar';
import ChatWindow from './homepage_Compenents/ChatWindow';

const Homepage = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 50px 50px 50px 50px;
  grid-template-areas:
    'nav nav nav nav nav nav'
    'chat liv liv liv liv liv '
    'chat liv liv liv liv liv '
    'chat liv liv liv liv liv '
    'chat liv liv liv liv liv ';

  grid-gap: 3px;
`;

const HomePage = () => (
  <Homepage>
    <Navbar />

    <ChatWindow />
    {/* this is were the live stream compenet is going to be */}
  </Homepage>
);
export default HomePage;
