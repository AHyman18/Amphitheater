import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from './homepage_Compenents/Navbar';
import ChatWindow from './homepage_Compenents/ChatWindow';
import LiveStream from './homepage_Compenents/LiveStream';

const Homepage = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 50px 50px 50px 50px;
  grid-template-areas:
    'nav nav nav nav nav nav'
    'chat liv liv liv liv2 liv2 '
    'chat liv liv liv liv2 liv2 '
    'chat liv liv liv liv2 liv2 '
    'chat liv liv liv liv2 liv2';

  grid-gap: 3px;
  #you{
    grid-area: liv2
  }
  #friend{
    grid-area: liv
  }
  section:{
    max-height: 1fr;
    background-color: grey;
    border: 2px solid black;
    width: 100%;
    height: 100%;
  }
  video:{
    object-fit: fill;
  }
`;
// grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
//   grid-template-columns: auto 50px auto;
//   grid-templat-areas: 'nav nav nav nav' 'chat . . .' 'chat . . .';
// // grid-template:
// [row1-start] 'nav nav nav nav' 1fr [row1-end]
// [row2-start] 'chat . . .' 200px [row2-end]
// [row3-start] 'chat . . .' 200px [row3-end]
// / auto 50px auto;

class HomePage extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      id: ['friend','you'],
      width: ['250', '50'],

    }
  } 
  
  render(){
    const liveStream = this.state.id.map((vid, idx)=>{
      return <LiveStream key={idx} id={vid} width={this.state.width[idx]}/>
    })
    console.log(liveStream);
      return (<Homepage>
              <Navbar />
              <ChatWindow />
              {liveStream}
            </Homepage>
          );
    }
}

export default HomePage;
