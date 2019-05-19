import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  ol {
    display: flex;
    list-style: none;
    background-color: #444;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  li {
    text-decoration: none;
    color: #fff;
    display: block;
    transition: 0.3s background-color;
  }

  li :hover {
    background-color: #005f5f;
  }

  li.active {
    background-color: #fff;
    color: #444;
    cursor: default;
  }
  grid-area: nav;
`;

//
// ol {
//   list-style: none;
//   background-color: #444;
//   text-align: center;
//   padding: 0;
//   margin: 0;
// }
// li {
//   font-family: 'Oswald', sans-serif;
//   font-size: 1.2em;
//   line-height: 40px;
//   height: 40px;
//   border-bottom: 1px solid #888;
// }

// button {
//   text-decoration: none;
//   color: #fff;
//   display: block;
//   transition: 0.3s background-color;
// }

// button:hover {
//   background-color: #005f5f;
// }

// button.active {
//   background-color: #fff;
//   color: #444;
//   cursor: default;
// }

// @media screen and (min-width: 600px) {
//   .nav li {
//     width: 120px;
//     border-bottom: none;
//     height: 50px;
//     line-height: 50px;
//     font-size: 1.4em;
//   }

//   /* Option 1 - Display Inline */
//   li {
//     display: inline-block;
//     margin-right: -4px;
//   }

//   /* Options 2 - Float

// ol {
//   overflow: auto;
//   width: 600px;
//   margin: 0 auto;
// }
// nav {
//   background-color: #444;
//   grid-area: nav;
// }
// */
// }
const Navbar = () => {
  return (
    <Nav>
      <ol>
        <li>
          <button>profile</button>
        </li>
        <li>
          <button>chat</button>
        </li>
        <li>
          <button>setting</button>
        </li>
      </ol>
    </Nav>
  );
};
export default Navbar;
