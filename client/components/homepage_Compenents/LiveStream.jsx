import React from 'react';

const LiveStream = () => {
  let vision = <video autoplay = "true"></video>;
 
  if (navigator.mediaDevices.getUserMedia) {       
      navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1280 },
          height: { min: 720 }
        }, 
        audio: true})
    .then(function(stream) {
      video.srcObject = stream;
    })
    .catch(function(error) {
      console.log("Something went wrong!");
    })
  }

  return (
    <div>
      <div id="container">
      {vision}
      </div>
    <center style={{fontSize:40+'px'}}>
    </center>
    </div>
  )
};

export default LiveStream;
