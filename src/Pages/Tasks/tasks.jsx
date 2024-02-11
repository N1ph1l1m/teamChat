import React from 'react';
import Content from '../../Widgets/content/content';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
import Header from '../../Shared/header/header';

function Tasks(props) {
    return (
        <Content 
        header = {
            <Header tittle="Беседы"/>
        }
        contentItem = {
            <ContentWrap 
            item={<><h1>Hello</h1></>}/>
        }/>
    );
}

export default Tasks;