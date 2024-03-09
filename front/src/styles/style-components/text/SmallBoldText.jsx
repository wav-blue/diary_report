import styled, { css } from "styled-components";
import { StyleText } from "./StyleText";

const SmallBoldText = styled(StyleText)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.base};
      font-weight: ${theme.fonts.weight.bold};
    `;
  }}
`;
const SmallDarkGreenBoldText = styled(SmallBoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.darkGreen};
    `;
  }}
`;

const SmallGreenBoldText = styled(SmallBoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.green};
    `;
  }}
`;

const SmallPureWhiteBoldText = styled(SmallBoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.pureWhite};
    `;
  }}
`;

const SmallRedBoldText = styled(SmallBoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
    `;
  }}
`;
export {
  SmallBoldText,
  SmallDarkGreenBoldText,
  SmallGreenBoldText,
  SmallPureWhiteBoldText,
  SmallRedBoldText,
};
