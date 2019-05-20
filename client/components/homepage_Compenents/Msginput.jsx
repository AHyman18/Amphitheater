import React from 'react';
import styled from 'styled-components';

const messageInput = styled.div`
  display: flex;
  flex-direction: reverse-column;
  grid-area: chI;
`;
function Msginput() {
  return (
    <messageInput>
      <input
        type="text"
        name="msgContent"
        // value={this.props.content}
        placeholder="What's on your mind?"
        // onChange={this.handleChange}
      />
      <button id="msgSubmit" type="submit" onClick>
        submit
      </button>
    </messageInput>
  );
}

export default Msginput;
