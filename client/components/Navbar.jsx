import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faBars);

const NavDiv = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-around;
  background-color: white;
  align-items: center;
  font-size: 14px;
`;

const NavP = styled.p`
  margin: 0 40px;
  font-size: 14px;
  font-weight: 700;
`;
const Arrow = styled.div`
  flex: display;
  font-size: 30px;
  padding: 0 50%;
  background-color: white;
  padding: 0;
`;

const Navbar = () => {
  return (
    <NavDiv className="bars">
      <div id="menu">
        <FontAwesomeIcon icon="bars" />
      </div>
      <Arrow id="arrows">
        <span id="left"> &#8592;</span>
        <span id="right"> &#8594;</span>
      </Arrow>

      <NavP>
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          Home
        </Link>{' '}
      </NavP>
      <NavP>
        <Link to="/project" style={{ textDecoration: 'none', color: 'black' }}>
          Our Project
        </Link>{' '}
      </NavP>
      <NavP>
        <Link to="/aboutUs" style={{ textDecoration: 'none', color: 'black' }}>
          About Us
        </Link>
      </NavP>
    </NavDiv>
  );
};
export default Navbar;
