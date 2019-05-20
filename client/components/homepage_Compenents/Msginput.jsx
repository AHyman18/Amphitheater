import React, { Component } from 'react';
import styled from 'styled-components';

const MessageInput = styled.div`
  display: flex;
  flex-direction: reverse-column;
  grid-area: chI;
`;

class Msginput extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <MessageInput>
        <form onSubmit={this.props.onSubmit}>
          <input
            type="text"
            name="msgContent"
            placeholder="What's on your mind?"
            onChange={this.props.onChange}
          />
          <input type="submit"/>            
        </form>  
      </MessageInput>
    );
  }
}

export default Msginput;
