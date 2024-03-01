import styled, { css } from "styled-components";

const defaultSize = `
    width: 25%;
    padding: 8px 0px;
    margin: 12px;
`;

const GreenButton = styled.button`
  ${({ theme }) => {
    return css`
      ${defaultSize}
      background-color: ${theme.colors.white};
      border: ${theme.colors.green} 3.5px solid;
      &:hover {
        background-color: ${theme.colors.green};
        transition: 0.5s;
      }
    `;
  }}
`;

const RedButton = styled.button`
  ${({ theme }) => {
    return css`
      ${defaultSize}
      background-color: ${theme.colors.white};
      border: ${theme.colors.red} 3.5px solid;
      &:hover {
        background-color: ${theme.colors.red};
        transition: 0.5s;
    `;
  }}
`;

export { GreenButton, RedButton };
