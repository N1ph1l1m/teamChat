import styles from "../../App/Styles/menuIcon.module.css"
export default function MenuIcon({icon,title,handleClick}){
    return (
    <div className={styles.wrapMenuIcon} onClick={handleClick}>
        <img className={styles.headerMenuIcon} src={icon} alt={`${icon}-alt`}/>
        <p className={styles.iconTitle}>{title}</p>
    </div>)
}
