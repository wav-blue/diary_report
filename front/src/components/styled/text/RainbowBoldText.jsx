import styled, { css } from "styled-components";

const GreenBoldText = styled.a`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.green};
      font-size: ${theme.fonts.size.sLarge};
      font-weight: ${theme.fonts.weight.normal};
    `;
  }}
`;
const RedBoldText = styled.a`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
      font-size: 0.8rem;
    `;
  }}
`;
export { GreenBoldText, RedBoldText };
