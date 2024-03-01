import styled, { css } from "styled-components";

const marginAndPadding = `margin: 12px; padding: 6px 24px;`;

const BigGreenButton = styled.button`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.white};
      font-size: ${theme.fonts.size.sLarge};
      font-weight: ${theme.fonts.weight.bold}
      border: ${theme.colors.green} 3.5px solid;
      ${marginAndPadding}
      &:hover {
        background-color: ${theme.colors.green};
        transition: 0.5s;
      }
    `;
  }}
`;

const BigRedButton = styled.button`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.white};
      border: ${theme.colors.red} 3.5px solid;
      margin: 12px;
      padding: 4px 12px;
    `;
  }}
`;

export { BigGreenButton, BigRedButton };
