/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "../../App/Styles/icon.module.css";

const Icon = ({
  name,
  className,
  onClick,
  size,
  style,
  disabled,
  ...attrs
}) => {
  const elemSize = size ? { fontSize: `${size}px` } : null;
  const classes = classNames(
    styles.fa,
    `${styles.fa}-${name}`,
    className,
    { func: onClick },
    { disabled }
  );
  return (
    <i
      {...attrs}
      className={classes}
      onClick={disabled ? null : onClick}
      style={elemSize}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  name: "",
  className: "",
  onClick: null,
  size: null,
  disabled: false,
};
export default Icon;
/* eslint-enable */
