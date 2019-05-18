import React from 'react';
import styled from 'styled-components';
import Message from './Messages';

const MessageView = () => {
  const ChatWindow = styled.section`
    background-color: red;
  `;
  return (
    <ChatWindow>
      <div>I am the chatWindow</div>
      <Message />
    </ChatWindow>
  );
};

export default MessageView;
