import React from "react";
// import styled from "styled-components";
import Portal from "./portal";
import PropTypes from "prop-types";

import "./createGroupChat.scss";
import Icon from "../../Shared/icon/icon";
import Button from "../../Shared/button/button";

const GroupChat = ({ title, isOpen, onCancel, onSubmit, children }) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modalOverlay">
            <div className="modalWrap">
              <div className="modalBody">{children}</div>
              <div className="modalFooter">
                <Button className="modalButton" onClick={onCancel} invert>
                  Закрыть
                </Button>
                <Button className="modalButton" onClick={onSubmit}>
                  Создать
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

GroupChat.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

GroupChat.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default GroupChat;
