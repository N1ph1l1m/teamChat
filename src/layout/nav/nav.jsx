import React from 'react';
import styled from 'styled-components'

import NaviItem from './navItem/naviItem';

const NavWrap = styled.div`
width:260px;
height:100vh;
background-color:#000000;
display:flex;
align-items:start;
flex-direction: column;
padding:10px;

`
function Nav(props) {
    return (
        <NavWrap>
            <NaviItem/>
        </NavWrap>
    );
}

export default Nav;