import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <LoadingStyled>
      <ReactLoading
        type={"bars"}
        color={"#f9d342"}
        height={"30%"}
        width={"30%"}
      />
    </LoadingStyled>
  );
}

const LoadingStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
