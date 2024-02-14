import React from 'react';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
import Header from '../../Shared/header/header';

function Tasks(props) {
    return (
      <>
        <Header tittle="Задачи"/>
        <ContentWrap 
            item={<><h1>Hello</h1></>}/>
      </>
    );
}

export default Tasks;