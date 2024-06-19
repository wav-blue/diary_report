import React, { useState } from "react";
import {
  StyleModalBackContainer,
  StyleModalButton,
  StyleModalContainer,
  StyleModalTextBox,
} from "../../styles/style-components/component/StyleModalContainer";

const ModalContainer = (props) => {
  return (
    <StyleModalBackContainer>
      <StyleModalContainer>
        <StyleModalTextBox>
          <h3>{props.title}</h3>
          <hr />
          <br />
          <p>{props.detail}</p>
          <br />
          <StyleModalButton
            onClick={(e) => {
              props.setModal(null);
            }}
          >
            뒤로 가기
          </StyleModalButton>
        </StyleModalTextBox>
      </StyleModalContainer>
    </StyleModalBackContainer>
  );
};
export { ModalContainer };
