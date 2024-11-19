import React from "react";
import styles from "../../App/Styles/menuMessage.module.css"
import {IoArrowRedoSharp  , IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

export function MessageMenu({ menu }){
    if(!menu) return null;
  return (
    <>
  <ul className={styles.moreMenu} >
      <li><IoArrowRedoSharp  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/><span>Переслать</span></li>
      <li><IoCheckmarkCircleOutline  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/><span>Выбрать</span></li>
      <li><MdOutlineEmojiEmotions  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/> <span>Реакция</span></li>
      </ul>
    </>
  )

};
