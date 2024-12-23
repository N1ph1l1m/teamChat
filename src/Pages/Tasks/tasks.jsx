import React from 'react';
import ContentWrap from '../../Shared/contentWrap/contentWrap';
import Header from '../../Shared/header/header';
import { userEffect , useState} from "react";
import { getData } from '../../Entities/api/getUserList';
import ProgressBar from '../../Shared/progressBar/progressBar';
import Recipe from '../../Features/store_redux/recipe/recipe';
import { Loader } from '../../Shared/loader/loader';
function Tasks(props) {


    return (
      <div>
      {/* <Recipe/> */}
      <Loader custom widthLoader={"50px"}
        heightLoader={"50px"}
        borderLoader={"10px solid #f3f3f3"}
        borderTopLoader={"10px solid  #3498db"}
      />
      </div>
      );
}

export default Tasks;
