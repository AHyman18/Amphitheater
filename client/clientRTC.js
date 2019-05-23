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

  // console.log(uuid);
  localVideo = document.getElementById('localVideo');
  remoteVideo = document.getElementById('remoteVideo');
  // console.log(localVideo);
  serverConnection = new WebSocket(`wss://${window.location.hostname}:3000`);
  serverConnection.onmessage = gotMessageFromServer;
  // console.log(serverConnection);
  const constraints = {
    video: true,
    audio: true,
  };

  if (navigator.mediaDevices.getUserMedia) {
    // console.log('insider navigator');
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
}

function getUserMediaSuccess(stream) {
  // console.log('inside getUserMediaSuccess');
  localStream = stream;
  localVideo.srcObject = stream;
}

function start(isCaller) {
  // console.log('inside start');
  // console.log('isCaller, ', isCaller);
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.ontrack = gotRemoteStream;
  peerConnection.addStream(localStream);

  if (isCaller) {
    // console.log('inside isCaller');
    peerConnection
      .createOffer()
      .then(createdDescription)
      .catch(errorHandler);
  }
}

function gotMessageFromServer(message) {
  // console.log('LINE 70 ', peerConnection);
  // console.log('inside gotMessageFromServer');
  if (!peerConnection) start(false);

  const signal = JSON.parse(message.data);

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
    // console.log('inside else if ');
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandler);
  }
}

function gotIceCandidate(event) {
  // console.log('inside gotIceCandidate');
  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}

function createdDescription(description) {
  // console.log('insdie got description');

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
  // console.log('got remote stream');
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

// export default init;
