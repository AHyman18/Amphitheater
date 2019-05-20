import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from './homepage_Compenents/Navbar';
import ChatWindow from './homepage_Compenents/ChatWindow';
import LiveStream from './homepage_Compenents/LiveStream';
import MessageInput from './homepage_Compenents/Msginput';
import Msginput from './homepage_Compenents/Msginput';

const Homepage = styled.div`
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ['friend', 'you'],
      width: ['250', '200'],
      content: '',
      fin: '',
      mssgList: [],
    };
    this.handleMsgSubmit = this.handleMsgSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      content: event.target.value,
    });
    console.log(this.state.content);
  }

  handleMsgSubmit(event) {
    event.preventDefault();
    console.log(this.state.content);
    const newState = Object.assign({}, this.state);
    newState.mssgList.push(this.state.content);
    this.setState(newState);
  }

  render() {
    const liveStream = this.state.id.map((vid, idx) => {
      return <LiveStream key={idx} id={vid} width={this.state.width[idx]} />;
    });
    return (
      <Homepage>
        <Navbar />
        <ChatWindow info={this.state.mssgList} />
        <MessageInput
          onSubmit={this.handleMsgSubmit}
          onChange={this.handleInputChange}
        />
        {liveStream}
      </Homepage>
    );
  }
}

export default HomePage;
