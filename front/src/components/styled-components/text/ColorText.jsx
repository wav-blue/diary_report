import styled, { css } from "styled-components";
import { StyleText } from "./StyleText";

const ColorText = styled(StyleText)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.base};
      font-weight: ${theme.fonts.weight.normal};
    `;
  }}
`;
const GreenText = styled(ColorText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.green};
    `;
  }}
`;
const DarkGreenText = styled(ColorText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.darkGreen};
    `;
  }}
`;
const RedText = styled(ColorText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
      font-size: ${theme.fonts.size.base};
    `;
  }}
`;
export { GreenText, DarkGreenText, RedText };
