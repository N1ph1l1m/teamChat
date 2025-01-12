import React from "react";
import { Header } from "../../Shared/header/header";
import { ContentWrap } from "../../Shared/contentWrap/contentWrap";
function Automatization(props) {
  return (
    <>
      <Header tittle="Автоматизации" />
      <ContentWrap
        item={
          <>
            <h1>Комонент для интеграции сторонних API</h1>
          </>
        }
      />
    </>
  );
}

export default Automatization;
