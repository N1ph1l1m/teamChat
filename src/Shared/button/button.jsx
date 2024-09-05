import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css'

const Button = ({
    children, //даныне которые будут передаваться кнопке  и которая она будет отображать
    onClick,// функция которая будет передаваться кнопке 
     className,// передаваемые стили
     disabled, // не актиное состояние кнопки
     active,
     invert, // активное состояние 
      ...attrs
  }) => {
    const onClickAction = e => {
      if (disabled) {
        e.preventDefault();
      } else {
        return onClick(e);
      }
    };
  
    const classes = classNames(
      'btn',// стандартный стиль кнопки
      className,// передаваемый класс кнопки через пропс 
      { active },// применяется стиль к кнопке если состояние активное
      { invert },
    );
  
    const Tag = attrs.href ? 'a' : 'button';
  
    return (
      <Tag
        className={classes}
        disabled={disabled}
        onClick={onClickAction}
        {...attrs}
      >
        {children}
      </Tag>
    );
  };
  // присваевание типов к каждому пропсу 
  Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
  };
  // дефолтное значение пропсов
  Button.defaultProps = {
    children: 'My Button',
    onClick: () => {},
    className: '',
    disabled: false,
    active: false,
  };
  
  export default Button;
  