import React from "react";
import Nav from "../nav/nav";
import styled from 'styled-components'

const Main = styled.div`
 width:100vw;
 height:100vh;
`
function MainLayour(){
    return(
        <Main>
            <Nav/>
        </Main>
    )
}export default MainLayour;
