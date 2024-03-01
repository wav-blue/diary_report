import styled, { css } from "styled-components";

const ModalBackContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: absolute;
      width: 100%;
      height: 100%;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.4);
    `;
  }}
`;

const ModalContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: fixed;
      background-color: #ffffff;
      width: 70%;
      padding: 15px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;
  }}
`;

const ModalTextBox = styled.div`
  ${({ theme }) => {
    return css`
      overflow: auto;
      height: 450px;
    `;
  }}
`;

export { ModalContainer, ModalBackContainer, ModalTextBox };
