import styled, { css } from "styled-components";
import { StyleText } from "./StyleText";

const BoldText = styled(StyleText)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.sLarge};
      font-weight: ${theme.fonts.weight.normal};
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
const RedBoldText = styled(BoldText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
    `;
  }}
`;

export { BoldText, GreenBoldText, RedBoldText };
