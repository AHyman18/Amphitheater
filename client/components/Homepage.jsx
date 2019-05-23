import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
// import Navbar from './Navbar';
// import ChatWindow from './homepageComponents/ChatWindow';
import LiveStream from './homepageComponents/LiveStream';
// import MessageInput from './homepageComponents/Messages';
// import Msginput from './homepageComponents/Msginput';
import wrapper from '../clientRTC';
// import start from '../clientRTC';

const ChatWindowStyled = styled.section`
  display: flex;
  flex-direction: reverse-column;
  background-color: white;
  color: turquoise;
  border: 2px solid black;
  width: 100%;
  overflow-y: scroll;
  grid-area: chat;
`;

const MessageInputStyle = styled.div`
  display: flex;
  flex-direction: reverse-column;
  grid-area: chI;
`;

function HomePage(props) {
  const [id, setId] = useState(['localVideo', 'remoteVideo']);
  const [width, setWidth] = useState(['250', '200']);
  // const [content, setContent] = useState('');
  const [fin, setFin] = useState('');
  const [mssgList, setMssgList] = useState([]);

  // const handleInputChange = event => {
  //   console.log('content', content);
  //   setContent(event.target.value);
  // };

  const handleMsgSubmit = event => {
    event.preventDefault();
    setMssgList([...mssgList, event.target.elements[0].value]);
    event.target.elements[0].value = '';
  };

  const fetchReq = event => {
    wrapper();
    // init();
    // start(true);
  };

  return (
    <div>
      <video
        autoPlay
        style={{ border: '1px solid black' }}
        height="100"
        width="2la  00"
        id="localVideo"
      />
      <video
        autoPlay
        style={{ border: '1px solid black' }}
        height="100"
        width="200"
        id="remoteVideo"
      />
      <button onClick={fetchReq}>Start Video</button>
      <ChatWindowStyled>
        <ul>
          {mssgList.map((message, index) => {
            return <li key={index}>{message}</li>;
          })}
        </ul>
      </ChatWindowStyled>
      <MessageInputStyle>
        <form onSubmit={handleMsgSubmit}>
          <input
            type="text"
            name="msgContent"
            placeholder="What's on your mind?"
          />
          <input type="submit" />
        </form>
      </MessageInputStyle>
    </div>
  );
}

export default HomePage;
