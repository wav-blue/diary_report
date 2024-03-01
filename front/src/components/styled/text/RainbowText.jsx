import styled, { css } from "styled-components";

const RainbowText = styled.a`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
      font-size: 0.8rem;
    `;
  }}
`;
const GreenText = styled.a`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.darkGreen};
      font-size: 0.8rem;
    `;
  }}
`;
const RedText = styled.a`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.red};
      font-size: 0.8rem;
    `;
  }}
`;
export { RainbowText, GreenText, RedText };
