import React from 'react';
import styled from 'styled-components';
import Navbar from './homepage_Compenents/Navbar';
import ChatWindow from './homepage_Compenents/ChatWindow';

const Homepage = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

export default () => (
  <Homepage>
    <Navbar />
    <ChatWindow />
  </Homepage>
);
