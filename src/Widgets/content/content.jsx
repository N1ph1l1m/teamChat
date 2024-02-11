import React from 'react';
import styled from "styled-components";

const WrapContent = styled.div`
width:100vw;
height:100vh;
background-color:black;
`
const ItemContent = styled.div`
margin-top:10px;
background-color:white;
min-width:1280px;
height:97%;
width:99%;
border-radius:10px;
display:flex;
flex-direction:column;
align-items:start;

`
function Content(props) {
    return (
        <WrapContent>
            <ItemContent>
            {props.header}
            {props.contentItem}
            </ItemContent>
        </WrapContent>
    );
}

export default Content;