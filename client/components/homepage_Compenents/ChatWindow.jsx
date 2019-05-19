import React from 'react';
import styled from 'styled-components';
import Message from './Messages';

const ChatWindow = () => {
  const ChatWindowStyled = styled.section`
    background-color: red;
    border: 2px solid black;
    width: 100%;
    grid-area: chat;
  `;
  // grid-column: 1/2;
  // grid-row: 2/6;
  //
  // height: 200px;
  // grid-area: chat;
  return (
    <ChatWindowStyled>
      <div>I am the ChatWindowStyled</div>
      <Message />
      {/* this is where the message input button goes */}
    </ChatWindowStyled>
  );
};

export default ChatWindow;
