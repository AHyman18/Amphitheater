import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
// import Navbar from './Navbar';
// import ChatWindow from './homepageComponents/ChatWindow';
import LiveStream from './homepageComponents/LiveStream';
// import MessageInput from './homepageComponents/Messages';
// import Msginput from './homepageComponents/Msginput';

// import peerConnectionConfig from '../clientRTC';
// import init from '../clientRTC';
// import getUserMediaSuccess from '../clientRTC';
// import start from '../clientRTC';
// import gotMessageFromServer from '../clientRTC';
// import gotIceCandidate from '../clientRTC';
// import createdDescription from '../clientRTC';
// import gotRemoteStream from '../clientRTC';
// import errorHandler from '../clientRTC';
// import createUUID from '../clientRTC';

// let localVideo;
// let localStream;
// let remoteVideo;
// let peerConnection;
// let uuid;
// let serverConnection;
let localVideo;
let localStream;
let remoteVideo;
let peerConnection;
let uuid;
let serverConnection;

const peerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

function init() {
  uuid = createUUID();

  //console.log(uuid);
  localVideo = document.getElementById('localVideo');
  remoteVideo = document.getElementById('remoteVideo');
  //console.log(localVideo);
  serverConnection = new WebSocket(`wss://${window.location.hostname}:3000`);
  // serverConnection = new WebSocket(`ws://${window.location.hostname}:8443`);
  serverConnection.onmessage = gotMessageFromServer;
  //console.log(serverConnection);
  const constraints = {
    video: true,
    audio: true,
  };

  if (navigator.mediaDevices.getUserMedia) {
    //console.log('insider navigator');
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
}

function getUserMediaSuccess(stream) {
  //console.log('inside getUserMediaSuccess');
  localStream = stream;
  localVideo.srcObject = stream;
}

function start(isCaller) {
  console.log('inside start');
  console.log('isCaller, ', isCaller);
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.ontrack = gotRemoteStream;
  peerConnection.addStream(localStream);

  if (isCaller) {
    console.log('inside isCaller');
    peerConnection
      .createOffer()
      .then(createdDescription)
      .catch(errorHandler);
  }
}

function gotMessageFromServer(message) {
  //console.log('LINE 70 ', peerConnection);
  //console.log('inside gotMessageFromServer');
  if (!peerConnection) start(false);

  let signal = JSON.parse(message.data);

  // Ignore messages from ourself
  if (signal.uuid == uuid) return;

  if (signal.sdp) {
    peerConnection
      .setRemoteDescription(new RTCSessionDescription(signal.sdp))
      // eslint-disable-next-line func-names
      .then(function() {
        // Only create answers in response to offers
        if (signal.sdp.type == 'offer') {
          peerConnection
            .createAnswer()
            .then(createdDescription)
            .catch(errorHandler);
        }
      })
      .catch(errorHandler);
  } else if (signal.ice) {
    //console.log('inside else if ');
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandler);
  }
}

function gotIceCandidate(event) {
  //console.log('inside gotIceCandidate');
  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}

function createdDescription(description) {
  //console.log('insdie got description');

  peerConnection
    .setLocalDescription(description)
    .then(function() {
      serverConnection.send(
        JSON.stringify({ sdp: peerConnection.localDescription, uuid: uuid }),
      );
    })
    .catch(errorHandler);
}

function gotRemoteStream(event) {
  //console.log('got remote stream');
  remoteVideo.srcObject = event.streams[0];
}

function errorHandler(error) {
  console.log(error);
}

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

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
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    init();
  });
  const handleMsgSubmit = event => {
    event.preventDefault();
    setMssgList([...mssgList, event.target.elements[0].value]);
    event.target.elements[0].value = '';
  };

  const fetchReq = event => {
    // wrapper();
    // init();
    start(true);
  };

  return (
    <div>
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
