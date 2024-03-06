import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const BorderButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
      width: 300px;
      background-color: green;
      margin: ${theme.margins.small};
      padding: ${theme.paddings.small};
      background-color: ${theme.colors.white};
      border: 3.5px solid;
    `;
  }}
`;

const GreenBorderButton = styled(BorderButton)`
  ${({ theme }) => {
    return css`
      border: ${theme.colors.green};
      &:hover {
        background-color: ${theme.colors.green};
      }
    `;
  }}
`;

const RedBorderButton = styled(BorderButton)`
  ${({ theme }) => {
    return css`
      border: ${theme.colors.red};
      &:hover {
        background-color: ${theme.colors.red};
      }
    `;
  }}
`;

const SmallRoundGreenButton = styled.button`
  ${({ theme }) => {
    return css`
      margin: ${theme.margins.small};
      padding: ${theme.paddings.xsmall};
      background-color: ${theme.colors.white};
      border: ${theme.colors.green} 3.5px solid;
      border-radius: ${theme.shapes.radius.small};
      &:hover {
        background-color: ${theme.colors.green};
        transition: 0.5s;
      }
    `;
  }}
`;

export {
  BorderButton,
  GreenBorderButton,
  RedBorderButton,
  SmallRoundGreenButton,
};
