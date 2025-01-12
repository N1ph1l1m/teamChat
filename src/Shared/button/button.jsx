import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "../../App/Styles/button.module.css";

const Button = ({
  children,
  onClick,
  className,
  disabled,
  active,
  invert,
  ...attrs
}) => {
  const onClickAction = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  const classes = classNames(styles.btn, className, { active }, { invert });

  const Tag = attrs.href ? "a" : "button";

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
  children: "My Button",
  onClick: () => {},
  className: "",
  disabled: false,
  active: false,
};

export default Button;
