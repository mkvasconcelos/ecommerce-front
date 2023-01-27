import React, { useState } from "react";
import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  const [iconClick, setIconClick] = useState(false);
  return (
    <HeaderStyle aside={iconClick}>
      <h1>MyEcommerce</h1>
      <IconStyle>
        <h1>
          <BsList onClick={() => setIconClick((current) => !current)} />
        </h1>
      </IconStyle>
      <aside>
        <ul>
          <LinkStyle to="/">
            <li>Home</li>
          </LinkStyle>
          <li>Cart</li>
          <li>Sign-in</li>
          <li>Sign-up</li>
        </ul>
      </aside>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  padding: 0 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to left top, #292826 40%, #f9d342);
  aside {
    position: fixed;
    right: 0;
    top: 50px;
    display: ${(props) => (props.aside ? "block" : "none")};
    min-width: 100px;
    height: fit-content;
    display: flex;
    justify-content: center;
    background-color: #292826;
    padding: 5px 10px 0 10px;
    li {
      color: white;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
`;

const IconStyle = styled.div`
  * {
    color: white;
  }
  cursor: pointer;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
`;
