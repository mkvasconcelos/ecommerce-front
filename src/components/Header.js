import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/context";

export default function Header() {
  const [iconClick, setIconClick] = useState(false);
  const { token } = useContext(TokenContext);
  return (
    <HeaderStyle>
      <h1>AutoMax</h1>
      <IconStyle>
        <h1>
          <BsList onClick={() => setIconClick((current) => !current)} />
        </h1>
      </IconStyle>
      {iconClick && (
        <NavBarStyle>
          <ul>
            <LinkStyle to="/">
              <li>Home</li>
            </LinkStyle>
            <LinkStyle to="/cart">
              <li>Cart</li>
            </LinkStyle>
            {!token ? (
              <LinkStyle to="/sign-in">
                <li>Sign-in</li>
              </LinkStyle>
            ) : (
              <LinkStyle to="/profile">
                <li>Profile</li>
              </LinkStyle>
            )}
            <LinkStyle to="/admin-sign-in">
              <li>Admin</li>
            </LinkStyle>
          </ul>
        </NavBarStyle>
      )}
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

const NavBarStyle = styled.nav`
  position: fixed;
  right: 0;
  top: 50px;
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
`;
