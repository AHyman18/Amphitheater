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
  align-items: center;
  font-size: 14px;
`;

const NavP = styled.p`
  margin: 0 40px;
  font-size: 14px;
  font-weight: 700;
`;

const Navbar = () => {
  return (
    <NavDiv className="bars">
      <div id="menu">
        <FontAwesomeIcon icon="bars" />
      </div>

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
