import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100vw;
  heigth: 100vh;
  overflow: auto;
  padding: 5px;
`;

export function ContentWrap(props) {
  return <Wrap>{props.item}</Wrap>;
}
