import styled, { css } from "styled-components";

const StylePage = styled.div`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.pureWhite};
      padding: 0.5rem;
    `;
  }}
`;

export { StylePage };
