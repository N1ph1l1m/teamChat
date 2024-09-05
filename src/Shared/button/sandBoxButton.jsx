/* eslint-disable */
import React, { Fragment } from "react";
import Button from "./button";
import styled from "styled-components";

const InlineWrap = styled.div`
  margin: 0px auto;
  width: 500px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const Sandbox = () => (
  <div>
    <h2>
      <span>1. Text and onClick function:</span>
    </h2>
    <InlineWrap>
      <Button
        onClick={() => {
          console.log("!!!!");
        }}
      >
        Button text
      </Button>
    </InlineWrap>

    <h2>
      <span>2. Disabled button:</span>
    </h2>
    <InlineWrap>
      <Button
        onClick={() => {
          console.log("!!!!");
        }}
        disabled
      />
    </InlineWrap>

    <h2>
      <span>3. Active button:</span>
    </h2>
    <InlineWrap>
      <Button className="newWidth">Claasses</Button>
    </InlineWrap>

    <h2>
      <span>4. Supporting data, type and etc. attributes:</span>
    </h2>
    <InlineWrap>
      <Button data-name="button">Button</Button>
      <Button type="submit">Submit</Button>
    </InlineWrap>

    <h2>
      <span>5. Button link</span>
    </h2>
    <InlineWrap>
      <Button href="test">Link</Button>
      <Button href="test" disabled>
        Link
      </Button>
      <Button></Button>
    </InlineWrap>
  </div>
);

export default Sandbox;
/* eslint-enable */
