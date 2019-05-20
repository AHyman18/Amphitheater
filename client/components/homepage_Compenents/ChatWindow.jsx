import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Messages';

const ChatWindow = () => {
  const ChatWindowStyled = styled.section`
    display: flex;
    flex-direction: reverse-column;
    background-color: white;
    border: 2px solid black;
    width: 100%;

    grid-area: chat;
  `;
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(msg => {
        console.log('these are the messages', msg);
      })
      .catch(err => console.log(err));
  });

  return (
    <ChatWindowStyled>
      {/* this is where the message input button goes */}
    </ChatWindowStyled>
  );
};

export default ChatWindow;
