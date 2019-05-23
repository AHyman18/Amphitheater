import React from 'react';
import styled from 'styled-components';
// import { createBrowserHistory } from 'history';

const Arrow = styled.div`
  flex: display;
  font-size: 30px;
  padding: 0 50%;
`;

const ArrowComponent = () => {
  // console.log(appHistory);
  return (
    <Arrow id="arrows">
      <span id="left"> &#8592;</span>
      <span id="right"> &#8594;</span>
    </Arrow>
  );
};
export default ArrowComponent;
