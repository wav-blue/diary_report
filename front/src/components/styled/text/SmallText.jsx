import styled, { css } from "styled-components";
import { StyleText } from "./StyleText";

const SmallText = styled(StyleText)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.small};
    `;
  }}
`;

const SmallDarkGreyText = styled(SmallText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.darkGrey};
    `;
  }}
`;
const SmallRedText = styled(SmallText)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
    `;
  }}
`;

export { SmallDarkGreyText, SmallRedText };
