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

  console.log(uuid);
  localVideo = document.getElementById('localVideo');
  remoteVideo = document.getElementById('remoteVideo');
  console.log(localVideo);
  serverConnection = new WebSocket(`wss://${window.location.hostname}:3000`);
  // serverConnection = new WebSocket(`ws://${window.location.hostname}:8443`);
  serverConnection.onmessage = gotMessageFromServer;
  console.log(serverConnection);
  const constraints = {
    video: true,
    audio: true,
  };

  if (navigator.mediaDevices.getUserMedia) {
    console.log('insider navigator');
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
}

function getUserMediaSuccess(stream) {
  console.log('inside getUserMediaSuccess');
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
  console.log('LINE 70 ', peerConnection);
  console.log('inside gotMessageFromServer');
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
    console.log('inside else if ');
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandler);
  }
}

function gotIceCandidate(event) {
  console.log('inside gotIceCandidate');
  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}

function createdDescription(description) {
  console.log('insdie got description');

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
  console.log('got remote stream');
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

/*
// this file essential grabs the dom video elements, establishes a secure websocket channel, and uses the RTCPeerConnection API and stun/turn servers to handle incoming and outgoing calls. Once streams are acquired, the streams are sent to their corresponding divs
// const uuidGenerate = require('uuid/v4');
//   generate a unique identifier to identify computer
// const uuid = uuidGenerate();
const uuid = createUUID();
// console.log(createUUID);
// console.log(uuid);
let serverConnection;
let peerConnection;
let localStream;
// ice servers find the best path toconnect peers using either stun or turn servers
const peerConnectionConfigs = {
  server: null,
};
// on page ready:
function init() {
  console.log('init');
  //   use websocket api to open a two-way interactive communication session between the client and a server
  //   wss urls protected aainst "man-in-the middle "sniffing" or modification"
  serverConnection = new WebSocket('wss://localhost:3009');
  console.log('line 21', serverConnection);
  //   an event listener called when a message is retrieved from the server =>
  serverConnection.onMessage = retrievedMessageFunc;
  const constraints = {
    video: true,
    audio: true,
  };
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccessFunc)
      .catch('cant get user media');
  } else {
    alert('Browser does not support getUserMediaAPI');
  }
}
// helperFuncs
function getUserMediaSuccessFunc(stream) {
  console.log('getUserMediaSuccessFunc');
  let localVideo = document.querySelector('#localVideo');
  console.log(localVideo);
  localStream = stream;
  localVideo.srcObject = stream;
}
function gotRemoteStreamFunc(event) {
  console.log('got remote stream');
  let remoteVideo = document.querySelector('#remoteVideo');
  remoteVideo.srcObject = event.streams[0];
}
function startCall(isCaller) {
  console.log('startcaller');
  //   parameter isCaller is a boolean value
  //   the RTCPeerConnection API provides a method toconnect to a remote peer, maintain and monitor the connection, and close the connection once its no longer needed
  peerConnection = new RTCPeerConnection(peerConnectionConfigs.server);
  //   an event handler that specifies a function to be called when the iceCandidate event occurs on an RTCPeerConnection--this happens whenever the local ICE agaent needs to deliver a emssge to the other peer through the signaling server
  //   (An icecandidate event is sent to an RTCPeerConnection  when an RTCIceCandidate has been added to the target as a result of calling)
  peerConnection.onIceCandidate = iceCandidateRetrievedFunc;
  //   'track' event is sent to the ontrack event handler after a new track is added to the RTCRtpReceiver (track is the "channel" to establish the connection)
  console.log('above on track');
  peerConnection.ontrack = gotRemoteStreamFunc;
  console.log('below on track');
  peerConnection.addStream(localStream);
  if (isCaller) {
    // The createOffer() method of the RTCPeerConnection interface initiates the creation of an SDP offer for the purpose of starting a new WebRTC connection to a remote peer. The SDP offer includes information about any MediaStreamTracks already attached to the WebRTC session, codec, and options supported by the browser, and any candidates already gathered by the ICE agent, for the purpose of being sent over the signaling channel to a potential peer to request a connection or to update the configuration of an existing connection.
    // The return value is a Promise which, when the offer has been created, is resolved with a RTCSessionDescription object containing the newly-created offer.
    peerConnection
      .createOffer()
      .then(createdDescriptionFunc)
      .catch(errorHandlerFunc);
  }
}
function retrievedMessageFunc(messageEvent) {
  console.log('retrieved message func');
  //   if the peer connection does not exist then start the call =>
  if (!peerConnection) startCall(false);
  else {
  }
  const signal = JSON.parse(messageEvent.data);
  //   ignore messages from yourself
  console.log('about to signal');
  if (signal.uuid === uuid) return;
  //   if the data has an socket direct protocol--able to move the dat across a network quickly and efficiently (?)
  if (signal.sdp) {
    // This description specifies the properties of the remote end of the connection, including the media format. The method takes a single parameter—the session description—and it returns a Promise which is fulfilled once the description has been changed, asynchronously.
    // This is typically called after receiving an offer or answer from another peer over the signaling server. Keep in mind that if setRemoteDescription() is called while a connection is already in place, it means renegotiation is underway (possibly to adapt to changing network conditions). Because descriptions will be exchanged until the two peers agree on a configuration, the description submitted by calling setRemoteDescription() does not immediately take effect. Instead, the current connection configuration remains in place until negotiation is complete. Only then does the agreed-upon configuration take effect.
    console.log('insice sdp');
    peerConnection.setRemoteDescription(
      new RTCSessionDescription(signal.sdp)
        .then(function() {
          if (signal.sdp.type === 'offer') {
            peerConnection
              .createAnswer()
              .then(createdDescriptionFunc)
              .catch(errorHandlerFunc);
          }
        })
        .catch(errorHandlerFunc),
    );
  } else if (signal.ice) {
    console.log('is ice?');
    // An ICE candidate describes the protocols and routing needed for WebRTC to be able to communicate with a remote device.
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandlerFunc);
  }
}
function iceCandidateRetrievedFunc(event) {
  console.log('ice candidate retrieved');
  if (event.candidate !== null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}
function createdDescriptionFunc(description, server) {
  console.log('retrieved d esription--created description');
  peerConnection.setLocalDescription(description).then(function() {
    serverConnection.send(
      JSON.stringify({
        sdp: peerConnection.localDescription,
        uuid: uuid,
      }),
    );
  });
  // .catch(errorHandlerFunc);
}
function errorHandlerFunc() {
  console.log('error');
}
function createUUID() {
  console.log('uuid');
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
*/
