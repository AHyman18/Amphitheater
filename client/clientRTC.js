// this file essential grabs the dom video elements, establishes a secure websocket channel, and uses the RTCPeerConnection API and stun/turn servers to handle incoming and outgoing calls. Once streams are acquired, the streams are sent to their corresponding divs

// const uuidGenerate = require('uuid/v4');
//   generate a unique identifier to identify computer
// const uuid = uuidGenerate();
const uuid = createUUID();

let peerConnection;
let localStream;

// ice servers find the best path toconnect peers using either stun or turn servers
const peerConnectionConfigs = {
  iceServers: [
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

// on page ready:
function init() {
  const localVideo = document.querySelector('#localVid');
  const remoteVideo = document.querySelector('#remoteVid');
  //   use websocket api to open a two-way interactive communication session between the client and a server
  //   wss urls protected aainst "man-in-the middle "sniffing" or modification"
  const serverConnection = new WebSocket(
    `wss://${window.location.hostname}:${3000}`,
  );
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
      .catch(errorHandlerFunc);
  } else {
    alert('Browser does not supper getUserMediaAPI');
  }
}

// helperFuncs
function getUserMediaSuccessFunc(stream) {
  localStream = stream;
  localVideo.srcObject = stream;
}

function gotRemoteStreamFunc(event) {
  console.log('got remote stream');
  remoteVideo.srcObject = event.stream[0];
}

function startCall(isCaller) {
  //   parameter isCaller is a boolean value
  //   the RTCPeerConnection API provides a method toconnect to a remote peer, maintain and monitor the connection, and close the connection once its no longer needed
  peerConnection = new RTCPeerConnection(peerConnectionConfigs);
  //   an event handler that specifies a function to be called when the iceCandidate event occurs on an RTCPeerConnection--this happens whenever the local ICE agaent needs to deliver a emssge to the other peer through the signaling server
  //   (An icecandidate event is sent to an RTCPeerConnection  when an RTCIceCandidate has been added to the target as a result of calling)
  peerConnection.onIceCandidate = iceCandidateRetrievedFunc;
  //   'track' event is sent to the ontrack event handler after a new track is added to the RTCRtpReceiver (track is the "channel" to establish the connection)
  peerConnection.onTrack = gotRemoteStreamFunc;
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
  //   if the peer connection does not exist then start the call =>
  if (!peerConnection) startCall(false);
  const signal = JSON.parse(messageEvent.data);
  //   ignore messages from yourself
  if (signal.uuid === uuid) return;
  //   if the data has an socket direct protocol--able to move the dat across a network quickly and efficiently (?)
  if (signal.sdp) {
    // This description specifies the properties of the remote end of the connection, including the media format. The method takes a single parameter—the session description—and it returns a Promise which is fulfilled once the description has been changed, asynchronously.
    // This is typically called after receiving an offer or answer from another peer over the signaling server. Keep in mind that if setRemoteDescription() is called while a connection is already in place, it means renegotiation is underway (possibly to adapt to changing network conditions). Because descriptions will be exchanged until the two peers agree on a configuration, the description submitted by calling setRemoteDescription() does not immediately take effect. Instead, the current connection configuration remains in place until negotiation is complete. Only then does the agreed-upon configuration take effect.
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
    // An ICE candidate describes the protocols and routing needed for WebRTC to be able to communicate with a remote device.
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandlerFunc);
  }
}
function iceCandidateRetrievedFunc(event) {
  if (event.candidate !== null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}

function createdDescriptionFunc(description) {
  console.log('retrieved desription');
  peerConnection
    .setLocalDescription(description)
    .then(function() {
      serverConnection.send(
        JSON.stringify({ sdp: peerConnection.localDescription, uuid: uuid }),
      );
    })
    .catch(errorHandlerFunc);
}

function errorHandlerFunc() {
  console.log('error');
}

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
