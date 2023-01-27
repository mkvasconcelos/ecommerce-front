import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <FooterStyle>Footer</FooterStyle>;
}

const FooterStyle = styled.footer`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  padding: 0 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #292826;
`;
