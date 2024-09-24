import styled, { css } from "styled-components";
import { StyleButton } from "../button/StyleButton";

const StyleModalBackContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      width: 100%;
      height: 100%;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.4);
      overflow: hidden;
    `;
  }}
`;

const StyleModalContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: fixed;
      background-color: #ffffff;
      width: 35vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;
  }}
`;

const StyleModalTextBox = styled.div`
  ${({ theme }) => {
    return css`
      margin: 10%;
      overflow: auto;
      height: 450px;
    `;
  }}
`;

const StyleModalButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
      padding: ${theme.paddings.small};
      width: 30%;
    `;
  }}
`;

export {
  StyleModalContainer,
  StyleModalBackContainer,
  StyleModalTextBox,
  StyleModalButton,
};
