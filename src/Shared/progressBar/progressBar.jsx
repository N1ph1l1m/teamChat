import React from "react";
import styles from "../../App/Styles/progressbar.module.css";

export default function ProgressBar({ value }) {
    return (
        <div className={styles.progressBarWrap}>
            <div className={styles.progressBar}>
                <span style={{ width: `${value}%` }}>{value}%</span>
            </div>
        </div>
    );
}
