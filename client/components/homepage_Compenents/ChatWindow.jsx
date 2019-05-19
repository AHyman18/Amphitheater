import React from 'react';
import styled from 'styled-components';
import Message from './Messages';

export default () => {
  const ChatWindow = styled.section`
    background-color: red;
    border: 2px solid black;
    width: 30%;
    height: 200px;
    grid-area: chat;
  `;
  return (
    <ChatWindow>
      <div>I am the chatWindow</div>
      <Message />
      {/* this is where the message input button goes */}
    </ChatWindow>
  );
};
