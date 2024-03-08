import styled, { css } from "styled-components";

const ColumnFlexContainer = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.pureWhite};
      padding: 1rem;
      margin: 0.5rem;
      flex-direction: column;
    `;
  }}
`;

export default ColumnFlexContainer;
