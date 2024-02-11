import React from 'react';
import "../../App/Styles/header.scss";
function Header(props) {
    return (
        <div className='wrapHeader'>
            <span className='headerTitle'>
                {props.tittle}
            </span>
        </div>
    );
}

export default Header;