import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import init from '../clientRTC';
// background-color: #ffe4c4;

const HomeStyle = styled.div`
  height: 100%;
  background-image: url('https://previews.123rf.com/images/missisya/missisya1509/missisya150900131/44876657-hemp-sack-textile-texture-background.jpg');
  opacity: 0.8;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  border: 1px solid lightpink;

  #videoTags {
    padding-left: 32%;
    width: 80%;
  }
  button {
    margin-left: 45%;
    margin-bottom: 10%;
  }
  video {
    width: 50%;
    height: 50%;
  }
  #chat {
    height: 40%;
    width: 65%;
    margin-left: 15%;
  }
  #chatInput {
    list-style-type: none;
    color: #800000;
  }
  #textButton {
    margin-left: 20%;
  }
`;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   height:100%;
//   background-color: white;
//   background-image: url('https://payload.cargocollective.com/1/3/122854/11601417/Banner_1000.jpg');
//   opacity: 1;
//   background-position: top center;
//   background-repeat: no-repeat;
//   z-index: 1;

//   #video {
//     display: flex;
//     width: 80%;
//     flex-direction: row;
//   }
//   #chat {
//     display: flex:
//     width:80%;
//     flex-direction: column;
//     width: 20%;
//   }
//   #chatInput {
//     height: 300px;
//   }

const ChatWindowStyled = styled.section`
  display: flex;
  flex-direction: reverse-column;
  background-color: white;
  color: turquoise;
  border: 1px solid lightpink;
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
  const [fin, setFin] = useState('');
  const [mssgList, setMssgList] = useState([]);

  const handleMsgSubmit = event => {
    event.preventDefault();
    setMssgList([...mssgList, event.target.elements[0].value]);
    event.target.elements[0].value = '';
  };

  const fetchReq = event => {
    init();
  };

  return (
    <HomeStyle>
      <div id="videoTags">
        <video
          autoPlay
          style={{ border: '1px solid black' }}
          height="100"
          width="200"
          id="localVideo"
        />
        <video
          autoPlay
          style={{ border: '1px solid black' }}
          height="100"
          width="200"
          id="remoteVideo"
        />
      </div>
      <button onClick={fetchReq}>Start Video</button>
      <div id="chat">
        <ChatWindowStyled>
          <ul id="chatInput">
            {mssgList.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </ChatWindowStyled>
        <MessageInputStyle>
          <form onSubmit={handleMsgSubmit}>
            <input
              className="textButton"
              type="text"
              name="msgContent"
              placeholder="What's on your mind?"
            />
            <input className="textButton" type="submit" />
          </form>
        </MessageInputStyle>
      </div>
    </HomeStyle>
  );
}

export default HomePage;
