import React from 'react';
import Header from '../../Shared/header/header';
import ContentWrap from '../../Shared/contentWrap/contentWrap';

function MainPage(props) {
    return (
        <>
        <Header tittle="Main page"/>
        <ContentWrap 
            item={<><h1>Main</h1></>}/>
        </>
    );
}

export default MainPage;