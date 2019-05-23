import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const LandStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5% 0;
  h3 {
    color: black;
    font-size: 30px;
    margin: 90px 0 0 50px;
  }
  img {
    padding-right: 20px;
  }
`;

const LandingContent = () => {
  return (
    <LandStyle className="content">
      {/* <div id="arrows">
        <span id="left"> &#8592;</span>
        <span id="right"> &#8594;</span>
      </div> */}
      <br />
      <h3>Toe Fitness</h3>
      <br />
      <NavLink
        to="/login"
        style={{
          textDecoration: 'none',
          color: 'black',
          ':hover': { background: 'goldenrod' },
        }}
      >
        Login
      </NavLink>

      <br />
      <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
        Signup
      </Link>
    </LandStyle>
  );
};
export default LandingContent;
