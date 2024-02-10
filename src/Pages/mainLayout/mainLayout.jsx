import React from "react";
import Nav from "../../Widgets/nav/nav";
import styled from 'styled-components'

const Main = styled.div`
 width:100vw;
 height:100vh;
`
function MainPage(){
    return(
        <Main>
            <Nav/>
        </Main>
    )
}export default MainPage;
