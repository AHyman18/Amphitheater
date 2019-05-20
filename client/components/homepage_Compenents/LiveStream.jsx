import React from 'react';

class LiveStream extends React.Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(incoming => (this.videoTag.current.srcObject = incoming))
      .catch(console.log('SOMETHING IS WRONG'));
  }

  render() {
    return (
      <section id={this.props.id}>
        <video
          ref={this.videoTag}
          width={this.props.width}
          height={this.props.height}
          autoPlay
          title={this.props.title}
        />
      </section>
    );
  }
}

export default LiveStream;
