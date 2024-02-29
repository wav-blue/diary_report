import styled, { css } from "styled-components";

const GreenButton = styled.button`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.white};
      border: ${theme.colors.green} 3.5px solid;
    `;
  }}
`;

export default GreenButton;
