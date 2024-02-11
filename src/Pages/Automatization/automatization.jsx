import React from 'react';
import Header from '../../Shared/header/header';
import Content from '../../Widgets/content/content';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
function Automatization(props) {
    return (
        <Content 
        header = {
            <Header tittle="Автоматизации"/>
        }
        contentItem = {
            <ContentWrap 
            item={<><h1>Комонент для интеграции сторонних API</h1></>}/>
        }/>
    );
}

export default Automatization;