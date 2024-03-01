import styled, { css } from "styled-components";

const MainPageContainer = styled.div`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.pureWhite};
      border: ${theme.colors.grey} 3.5px solid;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;

export default MainPageContainer;
