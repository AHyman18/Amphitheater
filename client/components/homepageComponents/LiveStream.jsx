// import React from 'react';

// class LiveStream extends React.Component {
//   constructor(props) {
//     super(props);
//     this.videoTag = React.createRef();
//   }

//   componentDidMount() {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(incoming => (this.videoTag.current.srcObject = incoming))
//       .catch(console.log('SOMETHING IS WRONG'));
//   }

//   render() {
//     return (
//       <section>
//         <video
//           id={this.props.id}
//           ref={this.videoTag}
//           width={this.props.width}
//           height={this.props.height}
//           autoPlay
//           title={this.props.title}
//           src={''}
//         />
//       </section>
//     );
//   }
// }

// export default LiveStream;

// class HomePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: ['localVideo', 'remoteVideo'],
//       width: ['250', '200'],
//       content: '',
//       fin: '',
//       mssgList: [],
//     };
//     this.handleMsgSubmit = this.handleMsgSubmit.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   handleInputChange(event) {
//     this.setState({
//       content: event.target.value,
//     });
//     console.log(this.state.content);
//   }

//   handleMsgSubmit(event) {
//     event.preventDefault();
//     console.log(this.state.content);
//     const newState = Object.assign({}, this.state);
//     newState.mssgList.push(this.state.content);
//     this.setState(newState);
//   }

//   render() {
//     const liveStream = this.state.id.map((vid, idx) => {
//       return <LiveStream key={idx} id={vid} width={this.state.width[idx]} />;
//     });
//     return (
//       <HomepageStyle>
//         <Navbar />
//         <ChatWindow info={this.state.mssgList} />
//         <MessageInput
//           onSubmit={this.handleMsgSubmit}
//           onChange={this.handleInputChange}
//         />
//         {liveStream}
//       </HomepageStyle>
//     );
//   }
// }

{
  /* <section>
<video
  id={id}
  ref={videoTag}
  width={this.props.width}
  height={this.props.height}
  autoPlay
  title={this.props.title}
  src={''}
/>
</section> */
}

// const HomepageStyle = styled.div`
//   display: grid;
//   height: 100%;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: 1fr 50px 50px 50px 50px;
//   grid-template-areas:
//     'nav nav nav nav nav nav'
//     'chat chat liv liv liv2 liv2 '
//     'chat chat liv liv liv2 liv2 '
//     'chat chat liv liv liv2 liv2 '
//     'chI chI liv liv liv2 liv2';

//   grid-gap: 3px;
//   #you {
//     grid-area: liv2;
//   }
//   #friend {
//     grid-area: liv;
//   }
//   section: {
//     max-height: 1fr;
//     background-color: grey;
//     border: 2px solid black;
//     width: 100%;
//     height: 100%;
//   }
//   video: {
//     object-fit: fill;
//   }
// `;
