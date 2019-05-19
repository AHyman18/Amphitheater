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
// grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
//   grid-template-columns: auto 50px auto;
//   grid-templat-areas: 'nav nav nav nav' 'chat . . .' 'chat . . .';
// // grid-template:
// [row1-start] 'nav nav nav nav' 1fr [row1-end]
// [row2-start] 'chat . . .' 200px [row2-end]
// [row3-start] 'chat . . .' 200px [row3-end]
// / auto 50px auto;

const HomePage = () => (
  <Homepage>
    <Navbar />

    <ChatWindow />
    {/* this is were the live stream compenet is going to be */}
  </Homepage>
);
export default HomePage;
