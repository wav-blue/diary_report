import styled, { css } from "styled-components";
import { StyleText } from "./StyleText";

const BoldText = styled(StyleText)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.sLarge};
      font-weight: ${theme.fonts.weight.bold};
    `;
  }}
`;
const WhiteBoldText = styled(BoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.pureWhite};
    `;
  }}
`;
const GreenBoldText = styled(BoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.green};
    `;
  }}
`;
const DarkGreenBoldText = styled(BoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.darkGreen};
    `;
  }}
`;
const RedBoldText = styled(BoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
    `;
  }}
`;

export {
  BoldText,
  WhiteBoldText,
  GreenBoldText,
  RedBoldText,
  DarkGreenBoldText,
};
