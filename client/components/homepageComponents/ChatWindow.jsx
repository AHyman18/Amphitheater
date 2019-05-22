import React, { Component } from 'react';
import styled from 'styled-components';
import Message from './Messages';

const ChatWindowStyled = styled.section`
  display: flex;
  flex-direction: reverse-column;
  background-color: white;
  border: 2px solid black;
  width: 100%;
  overflow-y: scroll;
  grid-area: chat;
`;

class ChatWindow extends Component {
  constructor(props){
    super(props)

  }
  // const [messages, setMessage] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3000/messages')
  //     .then(res => res.json())
  //     .then(msg => {
  //       console.log('these are the messages', msg);
  //     })
  //     .catch(err => console.log(err));
  // });
  render(){
    const messages=this.props.info.map((msg,idx)=>{
     return <Message key={idx} mssg={msg}/>
    })
    return (
      <ChatWindowStyled>
        <div>
        {messages}
        </div>
      </ChatWindowStyled>
    )
  }
};

export default ChatWindow;
