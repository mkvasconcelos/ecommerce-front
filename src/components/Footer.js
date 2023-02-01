import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyle>
      <a href="https://github.com/mkvasconcelos">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="github logo"
        />
      </a>
      <a href="https://www.linkedin.com/in/mateuskavamotovasconcelos/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="github logo"
        />
      </a>
      <a href="mailto: mateuskvasconcelos@gmail.com">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
          alt="github logo"
        />
      </a>
    </FooterStyle>
  );
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
  img {
    width: 30px;
    cursor: pointer;
  }
`;
