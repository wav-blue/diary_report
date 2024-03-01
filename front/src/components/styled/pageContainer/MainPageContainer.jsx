import styled, { css } from "styled-components";

const MainPageContainer = styled.div`
  ${({ theme }) => {
    return css`
      border: ${theme.colors.grey} 3.5px solid;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;

export default MainPageContainer;
