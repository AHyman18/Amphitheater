import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './homepage_Compenents/Navbar';
import ChatWindow from './homepage_Compenents/ChatWindow';
import LiveStream from './homepage_Compenents/LiveStream';
// import MessageInput from './homepage_Compenents/MessageInput';

const HomepageStyle = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 50px 50px 50px 50px;
  grid-template-areas:
    'nav nav nav nav nav nav'
    'chat chat liv liv liv2 liv2 '
    'chat chat liv liv liv2 liv2 '
    'chat chat liv liv liv2 liv2 '
    'chI chI liv liv liv2 liv2';

  grid-gap: 3px;
  #you {
    grid-area: liv2;
  }
  #friend {
    grid-area: liv;
  }
  section: {
    max-height: 1fr;
    background-color: grey;
    border: 2px solid black;
    width: 100%;
    height: 100%;
  }
  video: {
    object-fit: fill;
  }
`;

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

  const handleMsgSubmit = event => {
    event.preventDefault();
    setMssgList([...mssgList, event.target.elements[0].value]);
    event.target.elements[0].value = '';
  };

  // useEffect(mssgList => {
  //   if (mssgList.length !== 0) {
  //     mssgList.map(each => {
  //       div.appendChild(each);
  //     });
  //   }
  // });

  // {mssgList.map(item => (
  //   <div>item</div>
  // ))}

  return (
    <HomepageStyle>
      <Navbar />
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
      {/* {liveStream} */}
    </HomepageStyle>
  );

  // return (
  //   <HomepageStyle>
  //     <Navbar />
  //     <ChatWindow info={mssgList} />
  //     <MessageInput onSubmit={handleMsgSubmit} onChange={handleInputChange} />
  //     {/* {liveStream} */}
  //   </HomepageStyle>
  // );
}

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

export default HomePage;
