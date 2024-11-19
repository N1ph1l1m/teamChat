import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/icon';
import '../../App/Styles/inputMessage.scss';
import styled from "styled-components";
import { FaPaperclip } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    border:1px solid gray;
    width:80vw;
`
const LabelsWrapper = styled.div`
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
`
const WrapIcon = styled.div`
width:100%;
height:30px;
display:flex;
flex-direction: row;
justify-content: space-between;
align-items:center;
padding:5px;
margin-top:10px


`

const InputMessage = ({
    id,
    className,
    label,
    error,
    ...attrs
})=>{
    const classes = classNames(
        'input',
        className,
        {error},
    );
    return (
        <InputWrapper>
            <LabelsWrapper>
            {
                label && <label className='inputLabel' htmlFor={id}>{label}</label>
            }

            {
                attrs.required && <span className='inputRequired'>Required</span>
            }
            </LabelsWrapper>

            <textarea

                name={id}
                id={id}
                className={classes}
                {...attrs}
            />
            {
                error && <span className='inputError'>{error}</span>
            }
            <WrapIcon>
                <div>
                <Icon className="iconChats"><FaPaperclip color="gray" size="20"/></Icon>
                <Icon className="iconChats"><CiImageOn color="gray" size="20"/></Icon>
                <Icon className="iconChats"><MdOutlineEmojiEmotions color="gray" size="20"/></Icon>
                </div>
                <div>
                <Icon><IoIosSend color="gray" size="20"/></Icon>
                </div>
            </WrapIcon>


        </InputWrapper>
    )
}


InputMessage.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
  };

  InputMessage.defaultProps = {
    className: '',
    label: '',
    error: '',
  };


export default InputMessage;
