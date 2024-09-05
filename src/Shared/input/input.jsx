import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./input.css";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const LabelsWrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const Input = ({ id, className, label, error, ...attrs }) => {
  const classes = classNames("input", className, { error });
  return (
    <InputWrapper>
      <LabelsWrapper>
        {label && (
          <label className="inputLabel" htmlFor={id}>
            {label}
          </label>
        )}

        {attrs.required && <span className="inputRequired">Required</span>}
      </LabelsWrapper>
      <input name={id} id={id} className={classes} {...attrs} />
      {error && <span className="inputError">{error}</span>}
    </InputWrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  className: "",
  label: "",
  error: "",
};

export default Input;
