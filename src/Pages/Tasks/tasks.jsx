import React from 'react';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
import Header from '../../Shared/header/header';
import { userEffect , useState} from "react";
import { getData } from '../../Entities/api/getUserList';
import ProgressBar from '../../Shared/progressBar/progressBar';
function Tasks(props) {


    return (
      <>
  <ProgressBar value={20} />
  <ProgressBar  value={100}  />
  <ProgressBar value={60}/>
      </>
    );
}

export default Tasks;
