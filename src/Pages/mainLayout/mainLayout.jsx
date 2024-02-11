import React from "react";
import Nav from "../../Widgets/nav/nav";
import Header from "../../Shared/header/header";
import Content from "../../Widgets/content/content";
import ContentWrap from "../../Shared/contentWrap/contentWrap";
import styled from 'styled-components'

const Main = styled.div`
 width:100vw;
 height:100vh;
 display:flex;
 flex-direction:row;
`
function MainPage(){
    return(
        <Main>
            <Nav/>
            <Content 
            header = {
                <Header tittle="Беседы"/>
            }
            contentItem = {
                <ContentWrap 
                item={<><h1>Hello</h1></>}/>
            }/>
        </Main>
    )
}export default MainPage;
