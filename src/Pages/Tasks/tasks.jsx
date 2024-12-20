import React from 'react';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
import Header from '../../Shared/header/header';
import { userEffect , useState} from "react";
import { getData } from '../../Entities/api/getUserList';
import ProgressBar from '../../Shared/progressBar/progressBar';
import Recipe from '../../Features/store_redux/recipe/recipe';
function Tasks(props) {


    return (
      <div>
      <Recipe/>

      </div>
      );
}

export default Tasks;
