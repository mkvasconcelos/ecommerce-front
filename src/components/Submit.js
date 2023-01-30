import React from "react";
import styled from "styled-components";

export default function Submit({ type, value }) {
  return <SubmitStyled type={type} value={value}></SubmitStyled>;
}

const SubmitStyled = styled.input`
  box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: #f9d342;
  color: #292826;
  border-radius: 10px;
  height: 46px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;
