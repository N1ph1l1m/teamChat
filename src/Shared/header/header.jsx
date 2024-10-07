import React from 'react';
import styles  from "../../App/Styles/header.module.css";
function Header(props) {
    return (
        <div className={styles.wrapHeader}>
            <span className={styles.headerTitle}>
                {props.tittle}
            </span>
        </div>
    );
}

export default Header;
