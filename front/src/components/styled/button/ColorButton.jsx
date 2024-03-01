import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const ColorButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
      width: 25%;
      padding: 8px 0px;
      margin: 12px;
      border: 0px solid;
    `;
  }}
`;

const GreenButton = styled(ColorButton)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.lightGreen};
      &:hover {
        background-color: ${theme.colors.green};
      }
    `;
  }}
`;

const RedButton = styled(ColorButton)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.red};
      &:hover {
        background-color: ${theme.colors.red};
    `;
  }}
`;

export { GreenButton, RedButton };
