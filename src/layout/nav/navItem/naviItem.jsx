import React from 'react';
import "./navItem.scss";

import { MdOutlineTaskAlt } from "react-icons/md";

function NaviItem(props) {
    return (
        <>
        <h2 className='tittleCompany'>Company N</h2>

            <div className='elementsWrap'>
        

            <div className='elementsMenuWrap'>
            <i className='icon'> <MdOutlineTaskAlt color="white" size="30"/></i>
          
            <p className='elementTittle'>Задачи</p>
            </div>

            {/* <div className='elementsMenuWrap'>
               
               <p className='elementTittle'>Уведомления</p>
           </div>
           
            <div className='elementsMenuWrap'>
            <p className='elementTittle'>Беседы</p>
            </div>

            <div className='elementsMenuWrap'>
            <p className='elementTittle'>Профиль</p>
            </div>   */}

            </div>
            
        </>
       
    );
}

export default NaviItem;